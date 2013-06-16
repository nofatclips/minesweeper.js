MineSweeper.ControlPanelView = function($panel) {

	var $display = $panel.find(".display-text");

	var initializeView = function() {
		$("#restart-button").click(function() {
			$panel.trigger("restart");
		});
		$("#validate-button").click(function() {
			$panel.trigger("validate");
		});
		$("#reveal-button").click(function() {
			$panel.trigger("reveal");
		});
		return this;
	};
	
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
		init: initializeView,
		youLose: displayGameFailed,
		youWin: displayGameSuccessful,
		inProgress: displayGameInProgress
	};

};