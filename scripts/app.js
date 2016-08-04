window.$ = require("jquery");

var controller = require('./controller.js');


$( document ).ready(function() {
	
	$('#process').on("click", function( event ){
		controller.components.forEach(function (item, index) {
			$('.tests').append(item);
		});
		controller.process({
			slowMotion: $('#slowMotion').prop("checked"),
			totalCycles: parseInt($("#cycles").val())
		});
	});
	
});
