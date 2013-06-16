// Code goes here

MineSweeper.ViewModel = function(width, height, mines) {
  
  width = width||MineSweeper.WIDTH;
  height = height||MineSweeper.HEIGHT;
  mines = mines||MineSweeper.BOMBS;
  var board = MineSweeper.Board(width, height, mines).init();
  var scope = $(MineSweeper.SCOPE);
  var mineField = MineSweeper.MineFieldView(scope).init(width, height);
  
  scope.on("reveal-cell", function(event, x, y) {
    if (board.hasBomb(x,y)) {
      revealBombs();
    } else {
      revealNum(x,y);      
    }
  });
  
  var revealBombs = function() {
	var mines = board.bombs();
    for (var i=0, l=mines.length; i<l; i++) {
		//mineField.revealBomb(mines[i].x, mines[i].y);
    }
  };
  
  var revealNum = function(row, column) {
    //console.log(board.bombsAround(row, column));
  };
  
  return {
    width: width,
    height: height,
    mines: mines
  };
  
}();