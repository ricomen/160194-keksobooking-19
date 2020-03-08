'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');

  var resetMap = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.prototype.forEach.call(pins, function (pin) {
      pin.remove();
    });
    if (window.data.offer.active()) {
      window.data.offer.card.remove();
    }
    mapPinMain.style.top = window.data.mainPinStartCoords.top + 'px';
    mapPinMain.style.left = window.data.mainPinStartCoords.left + 'px';
  };

  var fillMapOfPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.OFFER_NUMBER; i++) {
      if (data[i].offer) {
        fragment.append(window.pin.get(data[i]));
      }
    }

    mapPins.append(fragment);
  };

  window.utils.togglePageState(false);

  window.map = {
    fill: fillMapOfPins,
    reset: resetMap
  };

})();
