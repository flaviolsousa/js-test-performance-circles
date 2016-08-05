var constants = require('./constants.js');
var randomColor = require('randomcolor');
var triggerMaker = require('trigger-maker');

var Part = function Part( options ) {
	options = options || {};
	
	this.index = ++Part.prototype.count;
	
	this.x = options.x || constants.T_W / 2;
	this.y = options.y || constants.T_W / 2;
	this.r = options.r || constants.T_W / 2;
	this.parent = options.parent;
	this.depth = options.depth || (this.parent ? this.parent.depth + 1 : 0);
	this.color = options.color || randomColor();
	this.proccessed = false;
	
	if (this.parent) {
		this.trigger = this.parent.trigger;
	} else {
		this.trigger = triggerMaker.create();
	}
	this.trigger.fire(Part.prototype.EVENT_CREATED_PART, { source: this });
};

Part.prototype.split = function() {
	this.proccessed = true
	
	var newR = this.r/2;
	var newDepth = this.depth + 1;
	
	this.trigger.fire(Part.prototype.EVENT_SPLIT, { source: this });
	
	this.subParts = [];
	this.subParts = [
			new Part({ x: this.x - newR, y: this.y - newR, r: newR, depth: newDepth, parent: this}),
			new Part({ x: this.x + newR, y: this.y - newR, r: newR, depth: newDepth, parent: this}),
			new Part({ x: this.x - newR, y: this.y + newR, r: newR, depth: newDepth, parent: this}),
			new Part({ x: this.x + newR, y: this.y + newR, r: newR, depth: newDepth, parent: this})
		];
	
}

Part.prototype.count = 0;
Part.prototype.EVENT_SPLIT = "EVENT_SPLIT";
Part.prototype.EVENT_CREATED_PART = "EVENT_CREATED_PART";

module.exports = Part;
