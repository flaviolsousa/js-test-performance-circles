(function(){
	"use strict";
	
	var moment = require('moment'),
		scrollToElement = require('scroll-to-element'),
		testCanvas = require('./testCanvas.js'),
		testTreeDivs = require('./testTreeDivs.js'),
		testPIXI = require('./testPIXI_CanvasRenderer.js'),
		part = require('./part.js');

	var options = enhanceProcessOptions();
	var tests = [
			testCanvas
			,
			testTreeDivs
			,
			testPIXI
		];
	var selectedTests = null;
	var iCurrentTest = 0;
	var iCycle = 0;
	var delayStart = 0;
	var startCurrentTest = null;
	var pendParts = null;
	var components = [];

	function prepareProcessTest() {
		scrollToElement('#testWrapper' + options.selectedTests[iCurrentTest].getName());
		startCurrentTest = null;
		
		iCycle = 0;
		delayStart = 1500;
		pendParts = [ options.selectedTests[iCurrentTest].getPart() ];
		requestStepTest();
	}
	
	function requestStepTest() {
		if (options.slowMotion) {
			setTimeout(stepTest, 1000);
		} else {
			if (delayStart > 0) {
				setTimeout(stepTest, delayStart);
				delayStart = 0;
			} else {
				requestAnimationFrame(stepTest);
			}
		}
	}
	
	function stepTest() {
		if (startCurrentTest == null) {
			startCurrentTest = moment();
		}
		
		var item = pendParts.shift();
		item.split();
		if (item.depth + 1 < options.totalCycles) {
			pendParts = pendParts.concat(item.subParts);
		}
		
		if (pendParts.length > 0) {
			requestStepTest();
		} else {
			options.selectedTests[iCurrentTest].testWrapper.children('h2').html(`${ options.selectedTests[iCurrentTest].getName() } (${ moment().diff(startCurrentTest) } ms)`)
			
			if (++iCurrentTest < options.selectedTests.length) {
				prepareProcessTest();
			}
		}
	}

	tests.forEach(function (item, index) {
			item.testWrapper = $('<div></div>')
				.attr({
						class: "testWrapper",
						id: "testWrapper" + item.getName()
					})
				.append($('<h2/>').html(item.getName()))
				.append(item.getComponent())
				.append($('<br/>'));

			components.push(item.testWrapper);
		});

	function enhanceProcessOptions(options) {
		options = options || {};
		options.slowMotion = options.slowMotion || false;
		options.totalCycles = options.totalCycles || 3;
		options.selectedTests = options.selectedTests || tests;
		
		return options;
	}

	module.exports.process = function( pOptions ) {
		options = enhanceProcessOptions(pOptions);
		
		iCurrentTest = 0;
		prepareProcessTest();
		
	};

	module.exports.components = components;
	module.exports.tests = tests;

})();


