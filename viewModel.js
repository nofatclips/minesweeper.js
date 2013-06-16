// Code goes here

MineSweeper.ViewModel = function(width, height, mines) {
  
  width = width||MineSweeper.WIDTH;
  height = height||MineSweeper.HEIGHT;
  mines = mines||MineSweeper.BOMBS;
  var board = MineSweeper.Board(width, height, mines).init();
  var scope = $(MineSweeper.SCOPE);
  var mineField = MineSweeper.MineFieldView(scope).init(width, height);
  
  scope.on("reveal-cell", function(event, x, y) {
    console.log(board.bombs());
    if (board.hasBomb(x,y)) {
      revealBombs();
    } else {
      revealNum(x,y);      
    }
  });
  
  var revealBombs = function() {
    for (var i=0, l=board.bombs.length; i<l; i++) {
      alert(board.bombs()[i]);
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