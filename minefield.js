MineSweeper.MineFieldView = function($mineField) {

	var initializeView = function(width, height) {
		var $tr, $td;
		for (var i=0; i<width; i++) {
			$tr = $("<tr>").addClass("row-" + i).appendTo($mineField);
			for (var j=0; j<height; j++) {
				$td = $("<td>")
					.addClass("col-" + j)
					.addClass("hidden-cell")
					.data("row", i)
					.data("col", j)
					.appendTo($tr);
			}
		}
		$mineField.on("click", "td", function() {
		  var coords = [$(this).data("row"), $(this).data("col")];
		  $mineField.trigger("reveal-cell", coords);
		});
		return this; 
	};
  
	var revealBombInCellAtPosition = function(row, column) {
		getCellAtPosition(row, column)
			.removeClass("hidden-cell")
			.addClass("bomb-cell");
	};
	
	var revealNumberOfBombsAround = function(row, column, num) {
		getCellAtPosition(row, column)
			.removeClass("hidden-cell")
			.addClass("revealed-cell")
			.text((num) ? num : "");
	}
	
	var getCellAtPosition = function(row, column) {
		return $(".row-"+row+" .col-"+column);
	}
  
  
  return {
    init: initializeView,
	revealNum: revealNumberOfBombsAround,
	revealBomb: revealBombInCellAtPosition
  };

};


