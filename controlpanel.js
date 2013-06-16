MineSweeper.ControlPanelView = function($panel) {

	var $display = $panel.find(".display-text");

	$("#restart-button").click(function() {
		$panel.trigger("restart");
	});
	$("#validate-button").click(function() {
		$panel.trigger("validate");
	});
	$("#reveal-button").click(function() {
		$panel.trigger("reveal");
	});
	
	var displayGameFailed = function() {
		$display.text("BOOM!!! Game Over!");
	}

	var displayGameSuccessful = function() {
		$display.text("YAY!!! You won!");
	}

	var displayGameInProgress = function() {
		$display.text("Click on cell. Avoid bombs.");
	}
	
	return {
		youLose: displayGameFailed,
		youWin: displayGameSuccessful,
		inProgress: displayGameInProgress
	};

};