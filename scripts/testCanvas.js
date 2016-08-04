(function(){
	"use strict";
	
	var constants = require('./constants.js');
	var part = require('./part.js');
	var triggerMaker = require('trigger-maker');


	const MIN_RADIO_VALUE_TO_STROKE_PARTS = 2;
	const MAX_RADIO_VALUE_TO_STROKE_PARTS = 10;


	var model = {
		part: new part()
	}

	module.exports.getName = function() {
		return "SimpleCanvas";
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

	model.jCanvas = $('<canvas></canvas>')
		.attr({
			width: constants.T_W,
			height: constants.T_W
		});
	model.canvas = model.jCanvas[0];
	model.jContainer.append(model.jCanvas);

	var context=model.canvas.getContext("2d");
	context.fillStyle=constants.T_BACKGROUND_COLOR;
	context.fillRect(0, 0, constants.T_W, constants.T_W); 

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
		
		var context = model.canvas.getContext("2d");
		context.beginPath();
		context.fillStyle = options.color;
		context.arc(part.x, part.y, part.r, 0, 2 * Math.PI, false);
		context.fill();
		
		if (options.drawLineStroke) {
			context.lineWidth = 1;
			context.strokeStyle = options.color;
			context.stroke();
		}
	}

})();


