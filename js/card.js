'use strict';
(function () {
  var map = document.querySelector('.map');
  var offerdCardTpl = document.querySelector('#card').content.querySelector('.map__card');


  var KeyCode = {
    ENTER: 13,
    ESC: 27,
    MOUSE_LEFT: 0
  };

  var offerCloseHandler = function (evt) {
    if (evt.keyCode === KeyCode.ESC || evt.button === KeyCode.MOUSE_LEFT) {
      closeCard();
    }
  };

  var closeCard = function () {

  };

  var renderCard = function (data) {
    var filterContainer = map.querySelector('.map__filters-container');
    var card = getCard(data);
    var cardClose = card.querySelector('.popup__close');
    cardClose.addEventListener('mousedown', offerCloseHandler);
    document.addEventListener('keydown', offerCloseHandler);
    filterContainer.before(card);
  };

  var getCard = function (data) {
    var card = offerdCardTpl.cloneNode(true);
    var cardAvatar = card.querySelector('.popup__avatar');
    var cardTitle = card.querySelector('.popup__title');
    var cardAddress = card.querySelector('.popup__text--address');
    var cardPrice = card.querySelector('.popup__text--price');
    var cardType = card.querySelector('.popup__type');
    var cardCapacity = card.querySelector('.popup__text--capacity');
    var cardTime = card.querySelector('.popup__text--time');
    var cardFeatures = card.querySelector('.popup__features');
    var cardDesciption = card.querySelector('.popup__description');
    var cardPhotos = card.querySelector('.popup__photos');

    var getHousingType = function (type) {
      switch (type) {
        case 'flat':
          return 'Квартира';
        case 'bungalo':
          return 'Бунгало';
        case 'house':
          return 'Дом';
        case 'palace':
          return 'Дворец';
        default:
          return 'Неизвестный тип жилья';
      }
    };

    var getFeaturesFragment = function (features) {
      return features.reduce(function (acc, feature) {
        var li = document.createElement('li');
        li.className = 'popup__feature popup__feature--' + feature;
        acc.append(li);

        return acc;
      }, new DocumentFragment());

    };

    var getPhotosFragment = function (photos) {
      return photos.reduce(function (acc, photo) {
        var img = document.createElement('img');
        img.src = photo;
        img.alt = 'Фотография жилья';
        img.width = '45';
        img.height = '40';
        img.className = 'popup__photo';
        acc.append(img);

        return acc;
      }, new DocumentFragment());

    };

    var offerData = data;
    cardAvatar.src = offerData.author.avatar;
    cardTitle.textContent = offerData.offer.title;
    cardAddress.textContent = offerData.offer.address;
    cardPrice.textContent = offerData.offer.price + ' ₽/ночь';
    cardType.textContent = getHousingType(offerData.offer.type);
    cardCapacity.textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests;
    cardTime.textContent = 'Заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout;
    cardFeatures.append(getFeaturesFragment(offerData.offer.features));
    cardDesciption.textContent = offerData.offer.description;
    cardPhotos.append(getPhotosFragment(offerData.offer.photos));

    return card;
  };

  window.card = {
    render: renderCard,
    close: closeCard
  };

})();
