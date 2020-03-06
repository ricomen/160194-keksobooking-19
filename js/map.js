'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var fillMapOfPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.pin.get(data[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.utils.togglePageState(false);

  window.map = {
    fillMap: fillMapOfPins
  };

})();
