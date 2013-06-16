// Code goes here

MineSweeper.ViewModel = function(width, height, mines) {
  
  width = width||MineSweeper.WIDTH;
  height = height||MineSweeper.HEIGHT;
  mines = mines||MineSweeper.BOMBS;
  var board = MineSweeper.Board(width, height, mines).init();
  var $scope = $(MineSweeper.SCOPE);
  var mineField = MineSweeper.MineFieldView($scope).init(width, height);
  var $panel = $(MineSweeper.PANEL);
  var controlPanel = MineSweeper.ControlPanelView($panel).init();
  var gameInProgress = true;
  var revealed = false;
  
  $scope.on("reveal-cell", function(event, x, y) {
	if (!gameInProgress) return;
    if (board.hasBomb(x,y)) {
      gameOver();
    } else {
      revealNum(x,y);      
    }
  });
  
	$panel.on("restart", function() {
		console.log("restart");
	});
  
	$panel.on("validate", function() {
		console.log("validate");
	});

	$panel.on("reveal", function() {
		return (revealed) ? hideBombs() : revealBombs();
	});

	var gameOver = function() {
		gameInProgress = false;
		revealBombs();
	}
	
	var hideBombs = function() {
		mineField.hideBombs();
		revealed = false;
	}
  
	var revealBombs = function() {
		var mines = board.bombs();
		for (var i=0, l=mines.length; i<l; i++) {
			mineField.revealBomb(mines[i].x, mines[i].y);
		}
		revealed = true;
	};
  
	var revealNum = function(row, column) {
		board.expose(row, column);
		var num = board.bombsAround(row, column);
		mineField.revealNum(row, column, num);
		if (num > 0) return;

		var surroundingCells = board.cellsAround(row, column);
		for (var i=0, l=surroundingCells.length; i<l; i++) {
			var theCell = surroundingCells[i];
			if (theCell.isHidden()) {
				revealNum(theCell.x, theCell.y);
			}
		}
	};
  
  return {
    width: width,
    height: height,
    mines: mines
  };
  
}();