(function(){
	"use strict";
	
	/*
	https://pixijs.github.io/examples/
	https://github.com/pixijs/pixi.js
	*/

	
	const MIN_RADIO_VALUE_TO_STROKE_PARTS = 2;
	const MAX_RADIO_VALUE_TO_STROKE_PARTS = 10;
	
	var constants = require('./constants.js');
	var part = require('./part.js');
	var triggerMaker = require('trigger-maker');

	var pixi = require('pixi.js');
	
	//var renderer = pixi.WebGLRenderer(constants.T_W, constants.T_W);
	var renderer = new pixi.CanvasRenderer(constants.T_W, constants.T_W);
	renderer.backgroundColor = getIntColor(constants.T_BACKGROUND_COLOR);
	
	var stage = new PIXI.Container();
	var graphics = new PIXI.Graphics();
	
	stage.addChild(graphics);
	
	var model = {
		part: new part()
	}

	module.exports.getName = function() {
		return "PIXI_CanvasRenderer";
	};

	model.jContainer = $('<div></div>')
		.attr({
				id: "testContainer" + module.exports.getName(),
				class: "testContainer"
			});
	model.jContainer.append(renderer.view);

	module.exports.getComponent = function() {
		return model.jContainer;
	};

	module.exports.getPart = function(){
		return model.part;
	};

	draw(model.part);
	model.part.trigger.on(model.part.EVENT_SPLIT, function(event) {
		var part = event.source;
		draw(part, { color: constants.T_BACKGROUND_COLOR, drawLineStroke: (part.r > MIN_RADIO_VALUE_TO_STROKE_PARTS) });
	});
	model.part.trigger.on(model.part.EVENT_CREATED_PART, function(event) {
		var part = event.source;
		draw(part, { drawLineStroke: (part.r < MAX_RADIO_VALUE_TO_STROKE_PARTS) });
	});

	function draw (part, options) {
				options = options || {};
		options.color = options.color || part.color;
		
		
		graphics.lineStyle(0);
		graphics.beginFill(getIntColor(options.color), 1);
		graphics.drawCircle(part.x, part.y, part.r + (options.drawLineStroke ? 1 : 0));
		
		renderer.render(stage);
	}
	
	function getIntColor(htmlColor) {
		return eval(htmlColor.replace("#", "0x"))
	}

})();


