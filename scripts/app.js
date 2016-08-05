window.$ = require("jquery");

var controller = require('./controller.js');

$( document ).ready(function() {

	controller.tests.forEach(function (item, index) {
		$("div.checkTests").append($("<input/>").attr({ type: "checkbox", id: "checkTest" + item.getName(), class: "checkTest", indextest: index }).html(item.getName()))
			.append($("<span/>").attr({ class: "label" }).html(item.getName()))
			.append($("<br/>"));
	});
	$("div.checkTests").append($("<br/>"));
	
	$('#process').on("click", function( event ) {
		controller.components.forEach(function (item, index) {
			$('.tests').append(item);
		});
		
		var selectedCheckBoxTests = $("div.checkTests").children("input[type=checkbox]:checked");
		if (selectedCheckBoxTests.length > 0) {
			var selectedTests = selectedCheckBoxTests.map(function(){ 
				return controller.tests[parseInt($(this).attr("indextest"))]; 
			});
			
			controller.process({
				slowMotion: $('#slowMotion').prop("checked"),
				totalCycles: parseInt($("#cycles").val()),
				selectedTests: selectedTests
			});
			
			selectedCheckBoxTests.prop('checked', false);
			selectedCheckBoxTests.attr("disabled", true);
		}
		
	});
	
});
