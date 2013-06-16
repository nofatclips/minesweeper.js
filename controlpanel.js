MineSweeper.ControlPanelView = function($panel) {

	var $display = $panel.find(".display-text");
	var $level = $panel.find(".level-selector");

	$("#restart-button").click(function() {
		$panel.trigger("restart");
	});
	$("#validate-button").click(function() {
		$panel.trigger("validate");
	});
	$("#reveal-button").click(function() {
		$panel.trigger("reveal");
	});
	
	$level.change(function(e) {
		$panel.trigger("level", [$(this).val()]);
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
	
	var difficultyLevel = function() {
		return $level.val();
	}
	
	return {
		youLose: displayGameFailed,
		youWin: displayGameSuccessful,
		inProgress: displayGameInProgress,
		level: difficultyLevel
	};

};