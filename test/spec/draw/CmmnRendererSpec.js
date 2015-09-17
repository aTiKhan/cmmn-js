'use strict';

var TestHelper = require('../../TestHelper');
var coreModule = require('../../../lib/core');

/* global bootstrapViewer, inject */

var testModules = [ coreModule ];


function bootstrap(xml, done) {
  bootstrapViewer(xml, { modules : testModules })(done);
}

describe('draw - cmmn renderer', function() {

  describe('case plan model', function() {

    it('should render case plan model', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/case-plan-model.cmmn');
      bootstrap(xml, done);
    });

  });


  describe('stage', function() {

    it('should expanded render stage', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/expanded-stage.cmmn');
      bootstrap(xml, done);
    });


    it('should expanded render discretionary stage', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/expanded-discretionary-stage.cmmn');
      bootstrap(xml, done);
    });


    it('should collapsed render stage', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/collapsed-stage.cmmn');
      bootstrap(xml, done);
    });


    it('should collapsed render discretionary stage', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/collapsed-discretionary-stage.cmmn');
      bootstrap(xml, done);
    });

  });

  describe('plan fragment', function() {

    it('should expanded render plan fragment', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/expanded-plan-fragment.cmmn');
      bootstrap(xml, done);
    });


    it('should collapsed render plan fragment', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/collapsed-plan-fragment.cmmn');
      bootstrap(xml, done);
    });

  });

  describe('task types', function() {

    it('should render untyped task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/untyped-task.cmmn');
      bootstrap(xml, done);
    });

    it('should render discretionary untyped task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/discretionary-untyped-task.cmmn');
      bootstrap(xml, done);
    });


    it('should render human task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/human-task.cmmn');
      bootstrap(xml, done);
    });


    it('should render discretionary human task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/discretionary-human-task.cmmn');
      bootstrap(xml, done);
    });


    it('should render manual task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/manual-task.cmmn');
      bootstrap(xml, done);
    });


    it('should render discretionary manual task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/discretionary-manual-task.cmmn');
      bootstrap(xml, done);
    });


    it('should render process task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/process-task.cmmn');
      bootstrap(xml, done);
    });


    it('should render discretionary process task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/discretionary-process-task.cmmn');
      bootstrap(xml, done);
    });


    it('should render case task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/case-task.cmmn');
      bootstrap(xml, done);
    });


    it('should render discretionary case task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/discretionary-case-task.cmmn');
      bootstrap(xml, done);
    });


    it('should render decision task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/decision-task.cmmn');
      bootstrap(xml, done);
    });


    it('should render discretionary decision task', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/discretionary-decision-task.cmmn');
      bootstrap(xml, done);
    });

  });


  describe('event listener', function() {

    it('should render untyped event listener', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/untyped-event-listener.cmmn');
      bootstrap(xml, done);
    });


    it('should render discretionary untyped event listener', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/discretionary-untyped-event-listener.cmmn');
      bootstrap(xml, done);
    });


    it('should render user event listener', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/user-event-listener.cmmn');
      bootstrap(xml, done);
    });


    it('should render discretionary user event listener', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/discretionary-user-event-listener.cmmn');
      bootstrap(xml, done);
    });


    it('should render timer event listener', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/timer-event-listener.cmmn');
      bootstrap(xml, done);
    });


    it('should render discretionary timer event listener', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/discretionary-timer-event-listener.cmmn');
      bootstrap(xml, done);
    });

  });


  describe('milestone', function() {

    it('should render milestone', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/milestone.cmmn');
      bootstrap(xml, done);
    });


    it('should render discretionary milestone', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/discretionary-milestone.cmmn');
      bootstrap(xml, done);
    });

  });


  describe('sentry', function() {

    it('should render entry criterion', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/entry-criterion.cmmn');
      bootstrap(xml, done);
    });


    it('should render exit criterion', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/exit-criterion.cmmn');
      bootstrap(xml, done);
    });


    it('should render exit criterion on case plan model', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/exit-criterion-on-case-plan-model.cmmn');
      bootstrap(xml, done);
    });

  });

  describe('case file item', function() {

    it('should render case file item', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/case-file-item.cmmn');
      bootstrap(xml, done);
    });

  });


  describe('on part', function() {

    it('should render plan item on part', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/plan-item-on-part.cmmn');
      bootstrap(xml, done);
    });


    it('should render plan item on part references exit criterion', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/plan-item-on-part-references-exit-criterion.cmmn');
      bootstrap(xml, done);
    });


    it('should render case file item on part', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/case-file-item-on-part.cmmn');
      bootstrap(xml, done);
    });

  });


  describe('connection', function() {

    it('should render connection', function (done) {
      var xml = require('../../fixtures/cmmn/renderer/connection.cmmn');
      bootstrap(xml, done);
    });

  });

  describe('planning table collapsed/expanded', function () {

    describe('stage contains expanded planning table', function() {

      var xml = require('../../fixtures/cmmn/renderer/stage-expanded-planning-table.cmmn');

      beforeEach(bootstrapViewer(xml, { modules: testModules }));

      it('should depict discretionary', inject(function(elementRegistry) {
        var element = elementRegistry.get('DIS_HumanTask_1');
        expect(element.hidden).to.equal(false);
      }));

    });


    describe('stage contains collapsed planning table', function() {

      var xml = require('../../fixtures/cmmn/renderer/stage-collapsed-planning-table.cmmn');

      beforeEach(bootstrapViewer(xml, { modules: testModules }));

      it('should not depict discretionary', inject(function(elementRegistry) {
        var element = elementRegistry.get('DIS_HumanTask_1');
        expect(element.hidden).to.equal(true);
      }));

    });

 
    describe('plan item contains expanded planning table', function() {

      var xml = require('../../fixtures/cmmn/renderer/plan-item-expanded-planning-table.cmmn');

      beforeEach(bootstrapViewer(xml, { modules: testModules }));

      it('should depict discretionary', inject(function(elementRegistry) {
        var element = elementRegistry.get('DIS_HumanTask_2');
        var connection = elementRegistry.get('Connection_1');

        expect(element.hidden).to.equal(false);
        expect(connection.hidden).to.equal(false);
      }));

    });

 
    describe('plan item contains collapsed planning table', function() {

      var xml = require('../../fixtures/cmmn/renderer/plan-item-collapsed-planning-table.cmmn');

      beforeEach(bootstrapViewer(xml, { modules: testModules }));

      it('should not depict discretionary', inject(function(elementRegistry) {
        var element = elementRegistry.get('DIS_HumanTask_2');
        var connection = elementRegistry.get('Connection_1');

        expect(element.hidden).to.equal(true);
        expect(connection.hidden).to.equal(true);
      }));

    });

 
    describe('discretionary item contains expanded planning table', function() {

      var xml = require('../../fixtures/cmmn/renderer/discretionary-item-expanded-planning-table.cmmn');

      beforeEach(bootstrapViewer(xml, { modules: testModules }));

      it('should depict discretionary', inject(function(elementRegistry) {
        var element1 = elementRegistry.get('DIS_HumanTask_1');
        var element2 = elementRegistry.get('DIS_HumanTask_2');
        var connection = elementRegistry.get('Connection_1');

        expect(element1.hidden).to.equal(false);
        expect(element2.hidden).to.equal(false);
        expect(connection.hidden).to.equal(false);
      }));

    });


    describe('discretionary item contains collapsed planning table', function() {

      var xml = require('../../fixtures/cmmn/renderer/discretionary-item-collapsed-planning-table.cmmn');

      beforeEach(bootstrapViewer(xml, { modules: testModules }));

      it('should not depict discretionary', inject(function(elementRegistry) {
        var element1 = elementRegistry.get('DIS_HumanTask_1');
        var element2 = elementRegistry.get('DIS_HumanTask_2');
        var connection = elementRegistry.get('Connection_1');

        expect(element1.hidden).to.equal(false);
        expect(element2.hidden).to.equal(true);
        expect(connection.hidden).to.equal(true);
      }));

    });


   describe('two plan items references the same definition containing a planning table', function() {

      var xml = require('../../fixtures/cmmn/renderer/plan-items-same-definition-with-planning-table.cmmn');

      beforeEach(bootstrapViewer(xml, { modules: testModules }));

      it('should not depict discretionary', inject(function(elementRegistry) {
        var element = elementRegistry.get('DIS_HumanTask_2');
        
        var connection1 = elementRegistry.get('Connection_1');
        var connection2 = elementRegistry.get('Connection_2');


        expect(element.hidden).to.equal(false);
        expect(connection1.hidden).to.equal(true);
        expect(connection2.hidden).to.equal(false);
      }));

    });

  });


});
