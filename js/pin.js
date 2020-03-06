'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');

  var getMapPinNode = function (pin) {
    var pinNode = pinTpl.cloneNode(true);
    var img = pinNode.querySelector('img');
    var imgAltText = pin.offer.title;
    var pinX = (pin.location.x - window.enums.PinSize.WIDTH / 2) + 'px';
    var pinY = (pin.location.y - window.enums.PinSize.HEIGHT) + 'px';
    var imgUrl = pin.author.avatar;

    img.src = imgUrl;
    img.alt = imgAltText;
    pinNode.style.left = pinX;
    pinNode.style.top = pinY;

    return pinNode;
  };

  var mapPinMainHandler = function () {
    if (window.utils.pageIsActive) {
      return;
    } else {
      window.utils.activatePage(true);
      window.dnd.init(window.form.fillAddress());
      mapPinMain.removeEventListener('mousedown', mapPinMainHandler);
      mapPinMain.removeEventListener('keydown', mapPinMainHandler);
    }
  };

  mapPinMain.addEventListener('mousedown', mapPinMainHandler);
  mapPinMain.addEventListener('keydown', mapPinMainHandler);

  window.pin = {
    get: getMapPinNode
  };
})();
