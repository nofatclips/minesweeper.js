MineSweeper.Cell = function(rowIndex, columnIndex) {
  
  var exposed = false;
  var hidesSomeBomb = false;
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
    hasBomb: isBombHiddenHere,
    putBomb: hideBombInThisCell,
    removeBomb: removeBombFromThisCell,
    toggleBlock: toggleBlockingOnThisCell,
    isBlocked: isThisCellBlocked
  };
  
};