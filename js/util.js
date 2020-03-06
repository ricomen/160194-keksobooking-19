'use strict';
(function () {
  var KeyCode = {
    ENTER: 13,
    ESC: 27,
    MOUSE_LEFT: 0
  };

  var getCoords = function (block) {
    var box = block.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  };

  window.util = {
    KeyCode: KeyCode,
    getCoords: getCoords,
  };

})();
