'use strict';
(function () {
  var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');

  var getPin = function (pin) {
    var pinNode = pinTpl.cloneNode(true);
    var img = pinNode.querySelector('img');
    var imgAltText = pin.offer.title;
    var pinX = (pin.location.x - PinSize.WIDTH / 2) + 'px';
    var pinY = (pin.location.y - PinSize.HEIGHT) + 'px';
    var imgUrl = pin.author.avatar;

    img.src = imgUrl;
    img.alt = imgAltText;
    pinNode.style.left = pinX;
    pinNode.style.top = pinY;

    var pinClickHandler = function () {
      if (pinNode.classList.contains('map__pin--active')) {
        return;
      }
      window.renderCard(pin);
      pinNode.classList.add('map__pin--active');
      openedOffer.pin = pinNode;
    };

    pinNode.addEventListener('click', pinClickHandler);

    return pinNode;
  };
  window.pin = {
    get: getPin,
  };
})();
