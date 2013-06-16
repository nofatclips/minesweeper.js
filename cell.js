MineSweeper.Cell = function(rowIndex, columnIndex) {
  
  var exposed = false;
  var hidesSomeBomb = false;
  var surroundingBombs = 0;
  
  var exposeCell = function() {
    exposed = true;
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
  
  var setNumberOfSurroundingBombs = function(bombs) {
    surroundingBombs = bombs;
    return this;
  };
  
  var getNumberOfSurroundingBombs = function() {
    return surroundingBombs;
  };

  var increaseNumberOfSurroundingBombs = function() {
    setNumberOfSurroundingBombs(getNumberOfSurroundingBombs() + 1);
  };


  return {
    x: rowIndex,
    y: columnIndex,
    expose: exposeCell,
    hide: hideCell,
    isExposed: isCellExposed,
	isHidden: isCellHidden,
    getBombNum: getNumberOfSurroundingBombs,
    incBombNum: increaseNumberOfSurroundingBombs,
    hasBomb: isBombHiddenHere,
    putBomb: hideBombInThisCell,
    removeBomb: removeBombFromThisCell
  };
  
};