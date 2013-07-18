MineSweeper.Cell = function(rowIndex, columnIndex) {
  
  var exposed = false;
  var hidesSomeBomb = false;
  var surroundingCells = undefined;
  var blocked = false;
  
  var exposeCell = function() {
    if (!isThisCellBlocked()) exposed = true;
    return this;
  };
  
  var hideCell = function() {
    exposed = false;
    return this;
  };
  
  var isCellExposed = function() {
    return exposed;
  };

  var isCellHidden = function() {
    return !exposed;
  };
  
  var hideBombInThisCell = function() {
    hidesSomeBomb = true;
    return this;
  };

  var removeBombFromThisCell = function() {
    hidesSomeBomb = false;
    return this;
  };

  var isBombHiddenHere = function() {
    return hidesSomeBomb;
  };
  
    var setListOfSurroundingCells = function(cells) {
        surroundingCells = cells;
    };
  
    var getNumberOfSurroundingBombs = function() {
        return surroundingCells.reduce(function (bombs, cell) {
            return (cell.hasBomb()) ? (bombs+1) : bombs;
        }, 0)
    };

  var toggleBlockingOnThisCell = function() {
    blocked = !blocked;
  }
  
  var isThisCellBlocked = function() {
    return blocked;
  }

  return {
    x: rowIndex,
    y: columnIndex,
    expose: exposeCell,
    hide: hideCell,
    isExposed: isCellExposed,
	isHidden: isCellHidden,
    setSurroundingCells: setListOfSurroundingCells,
    getBombNum: getNumberOfSurroundingBombs,
    hasBomb: isBombHiddenHere,
    putBomb: hideBombInThisCell,
    removeBomb: removeBombFromThisCell,
    toggleBlock: toggleBlockingOnThisCell,
    isBlocked: isThisCellBlocked
  };
  
};