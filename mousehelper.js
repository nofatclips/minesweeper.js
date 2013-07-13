MineSweeper.MouseHelper = function($scope) {

    var leftButtonDown = false;
    var middleButtonDown = false;
    var rightButtonDown = false;

    $scope.on("mouseup", function(event) {
        if (event.which === 1) {
            leftButtonDown = false;
        } else if (event.which === 2) {
            middleButtonDown = false;
        } else if (event.which === 3) {
            rightButtonDown = false;
        }
    }).on("mousedown", function(event) {
        if (event.which === 1) {
            leftButtonDown = true;
        } else if (event.which === 2) {
            middleButtonDown = true;
        } else if (event.which === 3) {
            rightButtonDown = true;
        }
    });
    
    var isLeftButtonDown = function() {
        return leftButtonDown;
    }

    var isRightButtonDown = function() {
        return rightButtonDown;
    }
    
    var isMiddleButtonDown = function() {
        return middleButtonDown;
    }
    
    var areLeftAndRightButtonDown = function() {
        return isLeftButtonDown() && isRightButtonDown();
    }

    return {
        leftDown: isLeftButtonDown,
        rightDown: isRightButtonDown,
        middleDown: isMiddleButtonDown,
        leftAndRightDown: areLeftAndRightButtonDown
    }

}