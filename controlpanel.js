MineSweeper.ControlPanelView = function($panel) {

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
  
  return {
    init: initializeView
  };

};


