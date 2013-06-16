MineSweeper.Board = function(width, height, bombs) {
  
  var boardCells = []; // Cells arranged as a 2D matrix
  var cellsNotContainingBomb = []; // Cells arranged in a vector
  var cellsContainingBomb = [];
  
  var buildBoard = function() {
    for (var i=0; i<height; i++) {
      boardCells[i] = [];
      for (var j=0; j<width; j++) {
        boardCells[i][j] = MineSweeper.Cell(i, j);
      }
    }  
  };
  
  var resetBoard = function() {
    cellsNotContainingBomb = [];
    cellsContainingBomb = [];
    for (var i=0; i<height; i++) {
      for (var j=0; j<width; j++) {
        boardCells[i][j].hide().removeBomb();
        cellsNotContainingBomb.push(boardCells[i][j]);
      }
    }
    return this;
  };
  
  var deployBombsInBoard = function() {
    cellsContainingBomb = [];
    for (var i=0; i<bombs; i++) {
      var cellWhereToDropTheBomb = getRandomElementFrom(cellsNotContainingBomb);
      deployBombIn(cellWhereToDropTheBomb);      
    }
	return this;
  };
  
  var deployBombIn = function(cell) {
    cell.putBomb();
    cellsContainingBomb.push(cell);
    cellsNotContainingBomb.splice(cellsNotContainingBomb.indexOf(cell), 1);
    var surroundingCells = getSurroundingCells(cell.x, cell.y);
    for (var i=0, l=surroundingCells.length; i<l; i++) {
      surroundingCells[i].incBombNum();
    }
  };
  
  var getAllBombs = function() {
    return cellsContainingBomb;
  };
  
  var getSurroundingCells = function(row, column) {
    var ret = [];
    var hasLeft   = row > 0,
        hasRight  = row < (width-1),
        hasTop    = column > 0,
        hasBottom = column < (height-1);
    if (hasLeft) ret.push(boardCells[row-1][column]);
    if (hasLeft && hasTop) ret.push(boardCells[row-1][column-1]);
    if (hasTop) ret.push(boardCells[row][column-1]);
    if (hasTop && hasRight) ret.push(boardCells[row+1][column-1]);
    if (hasRight) ret.push(boardCells[row+1][column]);
    if (hasRight && hasBottom) ret.push(boardCells[row+1][column+1]);
    if (hasBottom) ret.push(boardCells[row][column+1]);
    if (hasBottom && hasLeft) ret.push(boardCells[row-1][column+1]);
    return ret;
  };
  
  var initializeBoard = function() {
    buildBoard();
    resetBoard();
    deployBombsInBoard();
    return this;
  };
  
  var hasBombAtPosition = function(row, column) {
    return boardCells[row][column].hasBomb();
  };
  
  var numBombsSurroundingPosition = function(row, column) {
    return boardCells[row][column].getBombNum();
  };
  
  var getRandomElementFrom = function(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
  };
  
  return {
    width: width,
    height: height,
    numBombs: bombs,
    init: initializeBoard,
    hasBomb: hasBombAtPosition,
    bombs: getAllBombs,
    bombsAround: numBombsSurroundingPosition
  };
  
};