'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var MapRanges = {
    VERT_MIN: 130,
    VERT_MAX: 630,
    HORIZ_MIN: 0,
    HORIZ_MAX: map.clientWidth,
  };

  var init = function (cb) {

    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var shift = {
        x: evt.clientX - mainPin.getBoundingClientRect().left,
        y: evt.clientY - mainPin.getBoundingClientRect().top
      };

      var coords = {
        x: evt.pageX - map.offsetLeft - shift.x,
        y: evt.pageY - map.offsetTop - shift.y
      };

      var inMapRanges = function (mapRanges, pinCoords, pinSize) {
        var inVertRange = mapRanges.VERT_MIN < pinCoords.y + pinSize.HEIGHT && mapRanges.VERT_MAX > pinCoords.y + pinSize.HEIGHT;
        var inHorizRange = mapRanges.HORIZ_MIN < pinCoords.x + pinSize.WIDTH / 2 && mapRanges.HORIZ_MAX > pinCoords.x + pinSize.WIDTH / 2;
        return inVertRange && inHorizRange;
      };


      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        coords = {
          x: moveEvt.pageX - map.offsetLeft - shift.x,
          y: moveEvt.pageY - map.offsetTop - shift.y
        };

        if (inMapRanges(MapRanges, coords, window.data.MainPinSize)) {
          mainPin.style.left = coords.x + 'px';
          mainPin.style.top = coords.y + 'px';
        } else {
          return;
        }

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
