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

  var MoveRanges = {
    X: {
      MIN: MapRanges.X.MIN - (window.data.MainPinSize.WIDTH / 2),
      MAX: MapRanges.X.MAX - (window.data.MainPinSize.WIDTH / 2)
    },
    Y: {
      MIN: MapRanges.Y.MIN - window.data.MainPinSize.HEIGHT,
      MAX: MapRanges.Y.MAX - window.data.MainPinSize.HEIGHT
    }
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var isLeaveMap = false;

  var getCoord = function (lastCoords, newCoords) {
    var newLeft;
    var newTop;

    if (isLeaveMap) {
      newLeft = lastCoords.x;
      newTop = lastCoords.y;
    } else {
      newLeft = newCoords.x;
      newTop = newCoords.y;
    }

    if (newLeft < MoveRanges.X.MIN) {
      newLeft = MoveRanges.X.MIN;
      isLeaveMap = true;
    }

    if (newLeft > MoveRanges.X.MAX) {
      newLeft = MoveRanges.X.MAX;
      isLeaveMap = true;
    }

    if (newTop < MoveRanges.Y.MIN) {
      newTop = MoveRanges.Y.MIN;
      isLeaveMap = true;
    }

    if (newTop > MoveRanges.Y.MAX) {
      newTop = MoveRanges.Y.MAX;
      isLeaveMap = true;
    }

    return {
      x: newLeft,
      y: newTop
    };
  };

  var inMapRange = function (newCoords) {
    return newCoords.x > MoveRanges.X.MIN &&
      newCoords.y < MoveRanges.Y.MAX &&
      newCoords.x < MoveRanges.X.MAX &&
      newCoords.y > MoveRanges.Y.MIN;
  };

  var init = function (callback) {

    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var newPosition;
      var shift = {
        x: evt.clientX - mainPin.getBoundingClientRect().left,
        y: evt.clientY - mainPin.getBoundingClientRect().top
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var newCoords = {
          x: moveEvt.clientX - shift.x - map.getBoundingClientRect().left,
          y: moveEvt.clientY - shift.y - map.getBoundingClientRect().top
        };

        var lastCoords = {
          x: mainPin.style.left,
          y: mainPin.style.top,
        };

        if (inMapRange(newCoords)) {
          isLeaveMap = false;
        }

        newPosition = getCoord(lastCoords, newCoords);

        mainPin.style.left = newPosition.x + 'px';
        mainPin.style.top = newPosition.y + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (callback) {
          callback();
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
