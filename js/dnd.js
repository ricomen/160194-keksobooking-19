'use strict';
(function () {

  var MapRanges = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var init = function (cb) {
    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };

        var newStyleLeft = parseInt(mainPin.style.left, 10) - shift.x;
        var newStyleTop = parseInt(mainPin.style.top, 10) - shift.y;

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var getPositionStyle = function (axis, newStylePosition, side) {
          var position;
          if (newStylePosition < (MapRanges[axis].MIN - side)) {

            position = (MapRanges[axis].MIN - side) + 'px';
            document.removeEventListener('mousemove', onMouseMove);

          } else if (newStylePosition > (MapRanges[axis].MAX - side)) {

            position = (MapRanges[axis].MAX - side) + 'px';
            document.removeEventListener('mousemove', onMouseMove);

          } else {
            position = newStylePosition + 'px';
          }
          return position;
        };

        mainPin.style.left = getPositionStyle('X', newStyleLeft, window.data.MainPinSize.WIDTH / 2);
        mainPin.style.top = getPositionStyle('Y', newStyleTop, window.data.MainPinSize.HEIGHT);

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (cb) {
          cb();
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.dnd = {
    init: init
  };

})();
