// Code goes here

MineSweeper.ViewModel = function() {
	var width, height, mines;
	var currentBoard;
	var board = MineSweeper.Board(width, height, mines);
	var $scope = $(MineSweeper.SCOPE);
	var mineField = MineSweeper.MineFieldView($scope);
	var $panel = $(MineSweeper.PANEL);
	var controlPanel = MineSweeper.ControlPanelView($panel);
	var gameInProgress, revealed;
  
	$scope.on("reveal-cell", function(event, x, y) {		
        checkCell(x,y);
	});
    
    $scope.on("block-cell", function(event, x, y) {
        blockCell(x,y);
    });
    
    $scope.on("free-cell", function(event, x, y) {
        freeCell(x,y);
    });
  
	$panel.on("restart", function() {
		init();
	});
  
	$panel.on("validate", function() {
		return (validation()) ? victory() : gameOver();
	});

	$panel.on("reveal", function() {
		return (revealed) ? hideBombs() : revealBombs();
	});
	
	$panel.on("level", function(event, level) {
		currentBoard = level;
	});

	var getBoard = function(params) {
		var params = MineSweeper[params] || params || MineSweeper[MineSweeper.DEFAULT];
		console.log(params);
		width = params.width;
		height = params.height;
		mines = params.bombs;
		return MineSweeper.Board(width, height, mines);
	};
	
	var init = function(level) {
		currentBoard = controlPanel.level();
		board = getBoard(currentBoard).init();
		mineField.init(width, height);
		gameInProgress = true;
		revealed = false;
		controlPanel.inProgress();
	};
	
	var validation = function() {
		return board.validate();
	};
	
	var gameOver = function() {
		gameInProgress = false;
		controlPanel.youLose();
		revealBombs();
	};
	
	var victory = function() {
		gameInProgress = false;
		controlPanel.youWin();
	};
	
	var hideBombs = function() {
		mineField.hideBombs();
		revealed = false;
	};
  
	var revealBombs = function() {
		var mines = board.bombs();
		for (var i=0, l=mines.length; i<l; i++) {
			mineField.revealBomb(mines[i].x, mines[i].y);
		}
		revealed = true;
	};
  
	var revealNum = function(row, column) {
		board.expose(row, column);
        if (!isExposed(row, column)) return;
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

    var checkCell = function(row, column) {
        if (!gameInProgress || isBlocked(row, column)) return;
        if (board.hasBomb(row, column)) {
			gameOver();
            //alert("here");
		} else {
            //alert("there");
			revealNum(row, column);
		}
    }
    
    var blockCell = function(row, column) {
        if (!gameInProgress || isExposed(row, column)) return;
        board.toggleBlock(row, column);
        mineField.showAsBlocked(row, column);
    }
    
    var freeCell = function(row, column) {
        if (!gameInProgress || !isExposed(row, column)) return;
        var numBombs = board.bombsAround(row, column);
        var numBlocked = board.blockedAround(row, column);
        if (numBombs !== numBlocked) return;
        
        board.cellsAround(row, column).forEach(function(cell) {
            checkCell(cell.x, cell.y);
        });
    }
    
    var isBlocked = function(row, column) {
        return board.isBlocked(row, column);
    }
    
    var isExposed = function(row, column) {
        return board.isExposed(row, column);
    }
  
  return {
    width: width,
    height: height,
    mines: mines,
	init: init
  };
  
}().init();