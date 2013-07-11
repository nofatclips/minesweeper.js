MineSweeper.MineFieldView = function($mineField) {

    var leftButtonDown = false;
    var rightButtonDown = false;
    var animationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

    // This actions are to be performed even if the event occurred outside the game board
    $(document).on("mouseup", function(event) {
        $mineField.find(".highlight-cell").removeClass("highlight-cell");
        if (event.which === 1) { // Left click
            leftButtonDown = false;
        } else if (event.which === 3) { // Right click
            rightButtonDown = false;
        }
    }).on("mousedown", function(event) {
        if (event.which === 1) { // Left click
            leftButtonDown = true;
        } else if (event.which === 3) { // Right click
            rightButtonDown = true;
        }
    });
    
    // This actions are to be performed only if the event occurred inside the game board
    $mineField.on("contextmenu",function(e){
        return false;
    }).on("mousedown", "td", function(event) {
        var coords = [$(this).data("row"), $(this).data("col")];
        if (event.which === 1) { // Left click
            if (rightButtonDown) {
                $mineField.trigger("highlight-cell", coords);
            } else {
                highlightCell($(this));
            }
        } else if (event.which === 2) { // Middle click
            $mineField.trigger("highlight-cell", coords);
        } else if (event.which === 3) { // Right click
            if (leftButtonDown) {
                $mineField.trigger("highlight-cell", coords);
            } else {
                $mineField.trigger("block-cell", coords);
            }
        }
    }).on("mouseup", "td", function(event) {
        var coords = [$(this).data("row"), $(this).data("col")];
        if (event.which === 1) { // Left click
            if (rightButtonDown) {
                $mineField.trigger("free-cell", coords);
            } else {
                $mineField.trigger("reveal-cell", coords);
            }
        } else if (event.which === 2) { // Middle click
            $mineField.trigger("free-cell", coords);
        } else if (event.which === 3) {
            if (leftButtonDown) {
                $mineField.trigger("free-cell", coords);
            }
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
    
    var highlightCellAtPosition = function(row, column) {
        highlightCell(getCellAtPosition(row, column));
    }
    
    var highlightCell = function ($cell) {
        $cell.addClass("highlight-cell");
    }
    
    var alarmCellAtPosition = function(row, column) {
        $cell = getCellAtPosition(row, column);
        $cell.addClass("alarm-cell").one(animationEnd, function(e) {
            $cell.removeClass("alarm-cell");
        });
    }

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
    showAsBlocked: toggleBlockCellAtPosition,
    highlightCell: highlightCellAtPosition,
    alarmCell: alarmCellAtPosition
  };

};