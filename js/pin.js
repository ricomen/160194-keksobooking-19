'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');

  var getMapPinNode = function (data) {
    var pinNode = pinTpl.cloneNode(true);
    var img = pinNode.querySelector('img');
    var imgAltText = data.offer.title;
    var pinX = (data.location.x - window.enums.PinSize.WIDTH / 2) + 'px';
    var pinY = (data.location.y - window.enums.PinSize.HEIGHT) + 'px';
    var imgUrl = data.author.avatar;

    img.src = imgUrl;
    img.alt = imgAltText;
    pinNode.style.left = pinX;
    pinNode.style.top = pinY;

    var pinClickHandler = function () {
      if (window.data.offer.active() && window.data.offer.pin === pinNode) {
        return;
      } else if (window.data.offer.active()) {
        window.card.remove();
      }
      pinNode.classList.add('map__pin--active');
      var card = window.card.get(data);
      window.data.offer.set(card, pinNode);
      window.card.render(card);

    };

    pinNode.addEventListener('click', pinClickHandler);

    return pinNode;

  };

  var mapPinMainHandler = function () {
    if (window.data.pageIsActive) {
      return;
    } else {
      window.utils.activatePage(true);
      window.dnd.init(window.form.fillAddress);
    }
  };

  var mainPinInit = function () {
    mapPinMain.addEventListener('mousedown', mapPinMainHandler);
    mapPinMain.addEventListener('keydown', mapPinMainHandler);
  };

  mainPinInit();

  window.pin = {
    get: getMapPinNode
  };
})();
