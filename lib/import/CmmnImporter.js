'use strict';

var assign = require('lodash/object/assign'),
    map = require('lodash/collection/map');

var ModelUtil = require('../util/ModelUtil');
var LabelUtil = require('../util/LabelUtil');
var DiUtil = require('../util/DiUtil');
var Util = require('../util/DiUtil');

var is = ModelUtil.is;

var hasExternalLabel = LabelUtil.hasExternalLabel,
    getExternalLabelBounds = LabelUtil.getExternalLabelBounds;

var isCollapsed = DiUtil.isCollapsed,
    isPlanningTableCollapsed = DiUtil.isPlanningTableCollapsed;

var elementToString = Util.elementToString;


function elementData(semantic, attrs) {
  return assign({
    id: semantic.id,
    type: semantic.$type,
    businessObject: semantic
  }, attrs);
}

function collectWaypoints(waypoints) {
  return map(waypoints, function(p) {
    return { x: p.x, y: p.y };
  });
}

function notYetDrawn(semantic, refSemantic, property) {
  return new Error(
      'element ' + elementToString(refSemantic) + ' referenced by ' +
      elementToString(semantic) + '#' + property + ' not yet drawn');
}

function isElementHiddenOrCollapsed(element) {
  return element && (element.hidden || element.collapsed);
}

/**
 * An importer that adds cmmn elements to the canvas
 *
 * @param {EventBus} eventBus
 * @param {Canvas} canvas
 * @param {ElementFactory} elementFactory
 * @param {ElementRegistry} elementRegistry
 */
function CmmnImporter(eventBus, canvas, elementFactory, elementRegistry) {
  this._eventBus = eventBus;
  this._canvas = canvas;

  this._elementFactory = elementFactory;
  this._elementRegistry = elementRegistry;
}

CmmnImporter.$inject = [ 'eventBus', 'canvas', 'elementFactory', 'elementRegistry' ];

module.exports = CmmnImporter;


/**
 * Add cmmn element (semantic) to the canvas onto the
 * specified parent shape.
 */
CmmnImporter.prototype.add = function(semantic, parentElement) {

  var di = semantic.di,
      element,
      hidden;

  // ROOT ELEMENT
  if (is(semantic, 'cmmn:Case')) {
    element = this._elementFactory.createRoot(elementData(semantic));
    this._canvas.setRootElement(element);
  }

  // SHAPE
  else if (di && is(di, 'cmmndi:CMMNShape')) {

    if (!this._getElement(semantic)) {
      var collapsed = isCollapsed(semantic);
      
      hidden = isElementHiddenOrCollapsed(parentElement);

      var bounds = di.bounds;

      element = this._elementFactory.createShape(elementData(semantic, {
        collapsed: collapsed,
        hidden: hidden,
        x: Math.round(bounds.x),
        y: Math.round(bounds.y),
        width: Math.round(bounds.width),
        height: Math.round(bounds.height)
      }));

      if (is(semantic, 'cmmn:Criterion')) {
        this._attachCriterion(semantic, element);
      }

      this._canvas.addShape(element, parentElement);
    }
    else {
      if (is(semantic, 'cmmn:DiscretionaryItem')) {
        element = this._getElement(semantic);

        console.log(parentElement);

        // when
        // 1) the element itself is hidden and
        // 2) the parent is not hidden and
        // 3) the parent is not collapsed
        // => then reset the element.hidden with isPlanningTableCollapsed();
        // 
        // BACKGROUND:
        // - a human task contains a planning table with a discretionary item
        // - this human task is referenced at least by two plan items
        // - the DI for one plan item says "isPlanningTableCollapsed = true"
        // - so that in one case the discretionary item should not be depicted but in 
        //   the other cases it should be depicted
        // => the discretionary item is depicted
        if (element.hidden && !isElementHiddenOrCollapsed(parentElement)) {
          element.hidden = isPlanningTableCollapsed(semantic.referencedByItem);
          var gfx = this._elementRegistry.getGraphics(semantic.id);
          if (gfx) {
            // update display attribute
            gfx.attr('display', element.hidden ? 'none' : 'block');
          }
        }
      }
    }

  }

  // CONNECTION
  else if ((di && is(di, 'cmmndi:CMMNEdge')) || is(semantic, 'cmmndi:CMMNEdge')) {

    var source = this._getSource(semantic),
        target = this._getTarget(semantic);

    hidden = isElementHiddenOrCollapsed(parentElement) ||
             isElementHiddenOrCollapsed(source) ||
             isPlanningTableCollapsed(source) ||
             isElementHiddenOrCollapsed(target);

    var waypoint = (semantic.di || {}).waypoint || semantic.waypoint;

    element = this._elementFactory.createConnection(elementData(semantic, {
      hidden: hidden,
      source: source,
      target: target,
      waypoints: collectWaypoints(waypoint)
    }));

    this._canvas.addConnection(element, parentElement);
  } else {
    throw new Error('unknown di ' + elementToString(di) + ' for element ' + elementToString(semantic));
  }

  // (optional) LABEL
  if (hasExternalLabel(semantic)) {
    this.addLabel(semantic, element);
  }

  this._eventBus.fire('cmmnElement.added', { element: element });

  return element;
};


/**
 * Attach the criterion element to the given host
 *
 * @param {ModdleElement} criterionSemantic
 * @param {djs.model.Base} criterionElement
 */
CmmnImporter.prototype._attachCriterion = function(criterionSemantic, criterionElement) {
  var hostSemantic = criterionSemantic.$parent;

  if (!hostSemantic) {
    throw new Error('missing ' + elementToString(criterionSemantic) + '$parent');
  }

  var host = this._elementRegistry.get(hostSemantic.id),
      attachers = host && host.attachers;

  if (!host) {
    throw notYetDrawn(criterionSemantic, hostSemantic, 'criterion');
  }

  // wire element.host <> host.attachers
  criterionElement.host = host;

  if (!attachers) {
    host.attachers = attachers = [];
  }

  if (attachers.indexOf(criterionElement) === -1) {
    attachers.push(criterionElement);
  }
};


/**
 * add label for an element
 */
CmmnImporter.prototype.addLabel = function(semantic, element) {
  var bounds = getExternalLabelBounds(semantic, element);

  var label = this._elementFactory.createLabel(elementData(semantic, {
    id: semantic.id + '_label',
    labelTarget: element,
    type: 'label',
    hidden: element.hidden,
    x: Math.round(bounds.x),
    y: Math.round(bounds.y),
    width: Math.round(bounds.width),
    height: Math.round(bounds.height)
  }));

  return this._canvas.addShape(label, element.parent);
};

CmmnImporter.prototype._getSource = function(semantic) {
  if (is(semantic, 'cmmn:OnPart')) {

    if (semantic.exitCriterionRef) {
      return this._getEnd(semantic, 'exitCriterionRef');
    }

    return this._getEnd(semantic, 'sourceRef');
  }

  if (is(semantic, 'cmmndi:CMMNEdge')) {
    return this._getEnd(semantic, 'sourceCMMNElementRef');
  }

};

CmmnImporter.prototype._getTarget = function(semantic) {
  if (is(semantic, 'cmmn:OnPart')) {
    semantic = semantic.di;
  }
  return this._getEnd(semantic, 'targetCMMNElementRef');
};

CmmnImporter.prototype._getEnd = function(semantic, side) {
  var refSemantic = semantic[side];
  var element = refSemantic && this._getElement(refSemantic);

  if (element) {
    return element;
  }

  if (refSemantic) {
    throw notYetDrawn(semantic, refSemantic, side);
  } else {
    throw new Error(elementToString(semantic) + '#' + side + 'Ref not specified');
  }

};

CmmnImporter.prototype._getElement = function(semantic) {
  return this._elementRegistry.get(semantic.id);
};
