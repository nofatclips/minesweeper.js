MineSweeper.MineFieldView = function($mineField) {

    $mineField.on("contextmenu",function(e){
        return false;
    }).on("mousedown", "td", function(event) {
        var coords = [$(this).data("row"), $(this).data("col")];
        if (event.which === 1) { // Left click
            $mineField.trigger("reveal-cell", coords);
        } else if (event.which === 3) { // Right click
            $mineField.trigger("block-cell", coords);
        }
    });

	var initializeView = function(width, height) {
		$mineField.empty();
		var $tr, $td;
		for (var i=0; i<height; i++) {
			$tr = $("<tr>").addClass("row-" + i).appendTo($mineField);
			for (var j=0; j<width; j++) {
				$td = $("<td>")
					.addClass("col-" + j)
					.addClass("hidden-cell")
					.data("row", i)
					.data("col", j)
					.appendTo($tr);
			}
		}
        
		return this; 
	};
  
	var revealBombInCellAtPosition = function(row, column) {
		getCellAtPosition(row, column)
			.removeClass("hidden-cell")
			.addClass("bomb-cell");
	};

	var toggleBlockCellAtPosition = function(row, column) {
		getCellAtPosition(row, column)
			.removeClass("hidden-cell")
			.toggleClass("blocked-cell");
	};
	
	var revealNumberOfBombsAround = function(row, column, num) {
		getCellAtPosition(row, column)
			.removeClass("hidden-cell")
			.addClass("revealed-cell")
			.text((num) ? num : "");
	}
	
	var hideAllBombs = function() {
		$(".bomb-cell")
			.removeClass("bomb-cell")
			.addClass("hidden-cell");
	}
	
	var getCellAtPosition = function(row, column) {
		return $(".row-"+row+" .col-"+column);
	}
  
  
  return {
    init: initializeView,
	revealNum: revealNumberOfBombsAround,
	revealBomb: revealBombInCellAtPosition,
	hideBombs: hideAllBombs,
    showAsBlocked: toggleBlockCellAtPosition
  };

};


