'use strict';
(function () {
  var map = document.querySelector('.map');
  // var pins = map.querySelector('.map__pins');
  var cardTpl = document.querySelector('#card').content.querySelector('.map__card');

  var getCard = function (data) {
    var card = cardTpl.cloneNode(true);
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

    var cardData = data;
    cardAvatar.src = cardData.author.avatar;
    cardTitle.textContent = cardData.offer.title;
    cardAddress.textContent = cardData.offer.address;
    cardPrice.textContent = cardData.offer.price + ' ₽/ночь';
    cardType.textContent = getHousingType(cardData.offer.type);
    cardCapacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests;
    cardTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

    if (cardData.offer.features.length > 0) {
      cardFeatures.append(getFeaturesFragment(cardData.offer.features));
    } else {
      cardFeatures.remove();
    }

    if (cardData.offer.description.length > 0) {
      cardDesciption.textContent = cardData.offer.description;
    } else {
      cardDesciption.remove();
    }

    if (cardData.offer.photos.length > 0) {
      cardPhotos.appendChild(getPhotosFragment(cardData.offer.photos));
    } else {
      cardPhotos.remove();
    }
    return card;
  };

  var removeCard = function () {
    window.data.offer.card.removeEventListener('mousedown', cardCloseHandler);
    document.removeEventListener('keydown', cardCloseHandler);
    window.data.offer.pin.classList.remove('map__pin--active');
    window.data.offer.card.remove();
    window.data.offer.clear();
  };

  var renderCard = function (card) {
    var filterContainer = map.querySelector('.map__filters-container');
    var cardClose = card.querySelector('.popup__close');
    cardClose.addEventListener('mousedown', cardCloseHandler);
    document.addEventListener('keydown', cardCloseHandler);
    filterContainer.before(card);
  };

  var cardCloseHandler = function (evt) {
    if (window.utils.isEscPress(evt.keyCode) || window.utils.isMouseLeftPress(evt.button)) {
      removeCard();
    }
  };

  window.card = {
    get: getCard,
    render: renderCard,
    remove: removeCard
  };
})();
