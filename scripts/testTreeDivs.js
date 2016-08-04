(function(){
	"use strict";
	
	var constants = require('./constants.js');
	var part = require('./part.js');
	var triggerMaker = require('trigger-maker');

	const PREFIXO_ITEM_TEST_DIV = "itemTestDiv";
	const CLEAN_CLASS  = "display: block; float: left; background-color: " + constants.T_BACKGROUND_COLOR + ";";
	const CIRCLE_CLASS = "display: block; float: left; border-radius: 50%;";

	var model = {
		part: new part()
	}

	module.exports.getName = function() {
		return "TreeDIVs";
	};

	model.jContainer = $('<div></div>')
		.attr({
				id: "testContainer" + module.exports.getName(),
				class: "testContainer"
			});

	var div = createDiv(model.part);
	model.jContainer.append(div);
		
	module.exports.getComponent = function() {
		return model.jContainer;
	};

	module.exports.getPart = function(){
		return model.part;
	};

	model.part.trigger.on(model.part.EVENT_SPLIT, function(event) {
		var part = event.source;
		
		getDiv(part).attr("style", CLEAN_CLASS).css({
			width: Math.trunc(part.r * 2),
			height: Math.trunc(part.r * 2)
		});
	});
	model.part.trigger.on(model.part.EVENT_CREATED_PART, function(event) {
		var part = event.source;
		
		var div = createDiv(part);
		
		getDiv(part.parent).append(div);
		
	});

	function getDiv( part ){
		return $('#' + PREFIXO_ITEM_TEST_DIV + part.index);
	}

	function createDiv (part) {
		var div = $('<div></div>').attr({
				style: CIRCLE_CLASS,
				id: PREFIXO_ITEM_TEST_DIV + part.index
			}).css({
				width: Math.trunc(part.r * 2),
				height: Math.trunc(part.r * 2),
				"background-color": part.color
			});
		
		return div;
	}


})();
