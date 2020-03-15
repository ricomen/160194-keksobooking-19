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


  var init = function (cb) {

    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var shiftX = evt.clientX - mainPin.getBoundingClientRect().left;
      var shiftY = evt.clientY - mainPin.getBoundingClientRect().top;
      var isLeaveMap = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var newCoords = {
          x: moveEvt.clientX - shiftX - map.getBoundingClientRect().left,
          y: moveEvt.clientY - shiftY - map.getBoundingClientRect().top
        };

        var lastCoords = {
          x: mainPin.style.left,
          y: mainPin.style.top,
        };

        var inMapRanges =
          newCoords.x > MoveRanges.X.MIN &&
          newCoords.y < MoveRanges.Y.MAX &&
          newCoords.x < MoveRanges.X.MAX &&
          newCoords.y > MoveRanges.Y.MIN;

        if (inMapRanges) {
          isLeaveMap = false;
        }

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

        mainPin.style.left = newLeft + 'px';
        mainPin.style.top = newTop + 'px';
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
