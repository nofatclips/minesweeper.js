MineSweeper.MineFieldView = function($mineField) {

  var initializeView = function(width, height) {
    var $tr, $td;
    for (var i=0; i<width; i++) {
      $tr = $("<tr>").appendTo($mineField);
      for (var j=0; j<height; j++) {
        $td = $("<td>")
          .addClass("hidden-cell")
          .data("row", i)
          .data("col", j)
          .appendTo($tr);
      }
    }
    $mineField.on("click", "td", function() {
      var coords = [$(this).data("row"), $(this).data("col")];
      $mineField.trigger("reveal-cell", coords);
    });
    return this; 
  };
  
  return {
    init: initializeView
  };

};


