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
			//,
			//testTreeDivs
			//,
			//testPIXI
		];
	var iCurrentTest = 0;
	var iCycle = 0;
	var delayStart = 0;
	var startCurrentTest = null;
	var subParts = null;
	var components = [];


	function splitParts( parts ) {
		iCycle++;
		subParts = [];
		parts.forEach(function (item, index) {
			item.split();
			subParts = subParts.concat(item.subParts);
		});
		
		if (iCycle < options.totalCycles) {
			requestStepTest();
		} else {
			tests[iCurrentTest].testWrapper.children('h2').html(`${ tests[iCurrentTest].getName() } (${ moment().diff(startCurrentTest) } ms)`)
			
			if (++iCurrentTest < components.length) {
				prepareProcessTest();
			}
			
		}
	}
	
	function prepareProcessTest() {
		scrollToElement('#testWrapper' + tests[iCurrentTest].getName());
		startCurrentTest = moment();
		iCycle = 0;
		delayStart = 1500;
		subParts = [ tests[iCurrentTest].getPart() ];
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
		splitParts( subParts );
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
		
		return options;
	}

	module.exports.process = function( pOptions ) {
		options = enhanceProcessOptions(pOptions);
		
		iCurrentTest = 0;
		prepareProcessTest();
		
	};


	module.exports.components = components;

})();

