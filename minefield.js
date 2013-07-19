MineSweeper.MineFieldView = function($mineField) {

    var animationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
    var mouse = MineSweeper.MouseHelper($(document));
    $bombNum = $("#bombs-left");
    
    $mineField.on("contextmenu", function(e){
        return false;
    }).on("mousedown", "td", asyncMouseDown
     ).on("mouseup",   "td", asyncMouseUp
     ).on("mouseout",  "td", unHighlightCells
     ).on("mouseover", "td", function(event) {
        var coords = [$(this).data("row"), $(this).data("col")];
        if (mouse.leftAndRightDown() || mouse.middleDown()) {
            highlightCellsAt(coords);
        } else if (mouse.leftDown()) {
            $mineField.trigger("highlight-cell", coords);
        }
    });

    function asyncMouseDown(event) {
        mouse.waitFor(event, function() {
            var coords = [$(this).data("row"), $(this).data("col")];
            if (mouse.leftAndRightDown() || mouse.middleDown()) {
                highlightCellsAt(coords);
            } else if (mouse.leftDown()) {
                $mineField.trigger("highlight-cell", coords);
            } else if (mouse.rightDown()) {
                $mineField.trigger("block-cell", coords);
            }
        });
    }

    function asyncMouseUp(event) {
        unHighlightCells();
        mouse.waitFor(event, function() {
            var coords = [$(this).data("row"), $(this).data("col")];
            if (mouse.leftAndRightDown() || mouse.middleDown()) {
                $mineField.trigger("free-cell", coords);
            } else if (mouse.leftDown()) {
                $mineField.trigger("reveal-cell", coords);
            }
        });
    }
    
    var highlightCellsAt = function(coords) {
        unHighlightCells();
        $mineField.trigger("highlight-surrounding", coords);
    }

	var initializeView = function(width, height) {
		$mineField.empty();
		var $tr, $td;
		for (var i=0; i<height; i++) {
			$tr = $("<tr>").addClass("row-" + i).appendTo($mineField);
			for (var j=0; j<width; j++) {
				$td = $("<td>").addClass("hidden-cell col-" + j).data({"row": i, "col": j}).appendTo($tr);
                $("<i>").addClass("bug-icon-cell").appendTo($td);
			}
		}
		return this; 
	};
  
	var revealBombInCellAtPosition = function(row, column) {
		getCellAtPosition(row, column)
			.removeClass("hidden-cell")
			.addClass("bomb-cell")
            .find(".bug-icon-cell")
            .addClass("icon-bug");
	};
    
    var highlightCellAtPosition = function(row, column) {
        highlightCell(getCellAtPosition(row, column));
    }
    
    var highlightCell = function ($cell) {
        $cell.addClass("highlight-cell");
    }
    
    var alarmCellAtPosition = function(row, column) {
        var $cell = getCellAtPosition(row, column);
        $cell.addClass("alarm-cell").one(animationEnd, function(e) {
            $cell.removeClass("alarm-cell");
        });
    }

	var toggleBlockCellAtPosition = function(row, column) {
		$cell = getCellAtPosition(row, column).removeClass("hidden-cell");
        $cell.find(".bug-icon-cell").toggleClass("icon-thumbs-up-alt");
		$cell.toggleClass("blocked-cell")
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
			.addClass("hidden-cell")
            .children()
            .removeClass("icon-bug");
	}
	
	var getCellAtPosition = function(row, column) {
		return $(".row-"+row+" .col-"+column);
	}
    
    function unHighlightCells() {
        $mineField.find(".highlight-cell").removeClass("highlight-cell");
    }
    
    var updateInGameStatistics = function(stats) {
        if (stats.remainingBombs) $bombNum.text(stats.remainingBombs);
    }

    return {
        init: initializeView,
        revealNum: revealNumberOfBombsAround,
        revealBomb: revealBombInCellAtPosition,
        hideBombs: hideAllBombs,
        showAsBlocked: toggleBlockCellAtPosition,
        highlightCell: highlightCellAtPosition,
        alarmCell: alarmCellAtPosition,
        updateStats: updateInGameStatistics
    };

};