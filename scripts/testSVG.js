(function(){
	"use strict";
	
	var constants = require('./constants.js');
	var part = require('./part.js');
	var triggerMaker = require('trigger-maker');
	var Snap = require('snapsvg');

	window.Snap = Snap;
	window.constants = constants;

	
	const PREFIXO_ITEM_SVG = "itemSvg";
	
	var model = {
		part: new part()
	}

	module.exports.getName = function() {
		return "SVG";
	};

	model.jContainer = $('<div></div>')
		.attr({
				id: "testContainer" + module.exports.getName(),
				class: "testContainer"
			});

	module.exports.getComponent = function() {
		return model.jContainer;
	};

	module.exports.getPart = function(){
		return model.part;
	};

	$("document").ready(function(){
		model.sSvg = Snap(constants.T_W, constants.T_W);
		model.svg = model.sSvg.node;
		model.jContainer.append(model.svg);
	});
	
	
	model.part.trigger.on(model.part.EVENT_SPLIT, function(event) {
		var part = event.source;
		getDiv(part).remove();
	});
	
	model.part.trigger.on(model.part.EVENT_CREATED_PART, function(event) {
		var part = event.source;
		var circle = createSVG(part);
	});
	
	function getDiv( part ){
		return $('#' + PREFIXO_ITEM_SVG + part.index);
	}
	
	function createSVG (part) {
		var circle = model.sSvg.circle(part.x, part.y, part.r);
		
		circle.attr({
			id: PREFIXO_ITEM_SVG + part.index,
			fill: part.color
		});
	}


})();
