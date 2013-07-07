MineSweeper.Board = function(width, height, bombs) {
  
  var boardCells = []; // Cells arranged as a 2D matrix
  var cellsNotContainingBomb = []; // Cells arranged in a vector
  var cellsContainingBomb = []; // The rest of the cells
  
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
    var hasTop     = row > 0,
        hasBottom  = row < (height-1),
        hasLeft    = column > 0,
        hasRight   = column < (width-1);
    if (hasLeft) ret.push(boardCells[row][column-1]);
    if (hasLeft && hasTop) ret.push(boardCells[row-1][column-1]);
    if (hasTop) ret.push(boardCells[row-1][column]);
    if (hasTop && hasRight) ret.push(boardCells[row-1][column+1]);
    if (hasRight) ret.push(boardCells[row][column+1]);
    if (hasRight && hasBottom) ret.push(boardCells[row+1][column+1]);
    if (hasBottom) ret.push(boardCells[row+1][column]);
    if (hasBottom && hasLeft) ret.push(boardCells[row+1][column-1]);
    return ret;
  };
  
  var initializeBoard = function() {
    buildBoard();
    resetBoard();
    deployBombsInBoard();
    return this;
  };
  
  var hasBombAtPosition = function(row, column) {
	console.log(boardCells.length);
	console.log(boardCells[0].length);
    return boardCells[row][column].hasBomb();
  };
  
  var numBombsSurroundingPosition = function(row, column) {
    return boardCells[row][column].getBombNum();
  };
  
  var numBlockedCellsSurrooundingPosition = function(row, column) {
    return getSurroundingCells(row, column).filter(function(cell) {
        return cell.isBlocked();
    }).length;
  }
  
  var getRandomElementFrom = function(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
  };
  
  var exposeCellAtPosition = function(row, column) {
	boardCells[row][column].expose();
  }
  
  var isExposedCellAtPosition = function(row, column) {
    return boardCells[row][column].isExposed();
  }
  
  var toggleBlockCellAtPosition = function(row, column) {
    boardCells[row][column].toggleBlock()
  }
  
  var isBlockedCellAtPosition = function(row, column) {
    return boardCells[row][column].isBlocked();
  }
  
  var validateAllFreeCellsExposed = function() {
	for (var i=0, l=cellsNotContainingBomb.length; i<l; i++) {
		if (cellsNotContainingBomb[i].isHidden()) return false;
	}
	return true;
  }
  
  return {
    width: width,
    height: height,
    numBombs: bombs,
    init: initializeBoard,
    hasBomb: hasBombAtPosition,
    bombs: getAllBombs,
    bombsAround: numBombsSurroundingPosition,
    blockedAround: numBlockedCellsSurrooundingPosition,
	cellsAround: getSurroundingCells,
	expose: exposeCellAtPosition,
    isExposed: isExposedCellAtPosition,
	validate: validateAllFreeCellsExposed,
    toggleBlock: toggleBlockCellAtPosition,
    isBlocked: isBlockedCellAtPosition
  };
  
};