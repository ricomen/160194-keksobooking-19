'use strict';
var map = document.querySelector('.map');

var PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

var MainPinSize = {
  WIDTH: 50,
  HEIGHT: 82
};

var RoomsCounts = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
  DEFAULT: [0, 1, 2, 3]
};

var GuestCounts = {
  0: 'не для гостей',
  1: 'для 1 гостя',
  2: 'для 2 гостей',
  3: 'для 3 гостей',
};

var mapPins = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var mapFilters = map.querySelector('.map__filters');
var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');
var activeCard = {card: null, pin: null};

var checkToActivePin = function (currentPin) {
  return currentPin === activeCard.pin;
};

var hasActiveCard = function () {
  return !!activeCard.pin;
};

var setActiveCard = function (pin, card) {
  activeCard = {
    card: card,
    pin: pin
  };
};

var clearActiveCard = function () {
  activeCard = {card: null, pin: null};
};

var getMapPinNode = function (pin) {
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
    if (hasActiveCard() && checkToActivePin(pinNode)) {
      return;
    } else if (hasActiveCard()) {
      closeOfferCard();
    }
    pinNode.classList.add('map__pin--active');
    var card = getOfferCard(pin);
    setActiveCard(pinNode, card);
    renderOfferCard(card);
  };

  pinNode.addEventListener('click', pinClickHandler);

  return pinNode;
};

var fillMapOfPins = function (pins, target) {
  target.append(pins.reduce(function (acc, pin) {
    acc.append(getMapPinNode(pin));
    return acc;
  }, new DocumentFragment()));
};

var offerdCardTpl = document.querySelector('#card').content.querySelector('.map__card');

var KeyCode = {
  ENTER: 13,
  ESC: 27,
  MOUSE_LEFT: 0
};

var offerCloseHandler = function (evt) {
  if (evt.keyCode === KeyCode.ESC || evt.button === KeyCode.MOUSE_LEFT) {
    closeOfferCard();
  }
};


var closeOfferCard = function () {
  activeCard.card.removeEventListener('mousedown', offerCloseHandler);
  document.removeEventListener('keydown', offerCloseHandler);
  activeCard.card.remove();
  activeCard.pin.classList.remove('map__pin--active');
  clearActiveCard();
};

var renderOfferCard = function (card) {
  var filterContainer = map.querySelector('.map__filters-container');
  var cardClose = card.querySelector('.popup__close');
  cardClose.addEventListener('mousedown', offerCloseHandler);
  document.addEventListener('keydown', offerCloseHandler);
  filterContainer.before(card);
};

var getOfferCard = function (data) {
  var offerCard = offerdCardTpl.cloneNode(true);
  var offerCardAvatar = offerCard.querySelector('.popup__avatar');
  var offerCardTitle = offerCard.querySelector('.popup__title');
  var offerCardAddress = offerCard.querySelector('.popup__text--address');
  var offerCardPrice = offerCard.querySelector('.popup__text--price');
  var offerCardType = offerCard.querySelector('.popup__type');
  var offerCardCapacity = offerCard.querySelector('.popup__text--capacity');
  var offerCardTime = offerCard.querySelector('.popup__text--time');
  var offerCardFeatures = offerCard.querySelector('.popup__features');
  var offerCardDesciption = offerCard.querySelector('.popup__description');
  var offerCardPhotos = offerCard.querySelector('.popup__photos');

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
  offerCardAvatar.src = offerData.author.avatar;
  offerCardTitle.textContent = offerData.offer.title;
  offerCardAddress.textContent = offerData.offer.address;
  offerCardPrice.textContent = offerData.offer.price + ' ₽/ночь';
  offerCardType.textContent = getHousingType(offerData.offer.type);
  offerCardCapacity.textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests;
  offerCardTime.textContent = 'Заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout;
  offerCardFeatures.append(getFeaturesFragment(offerData.offer.features));
  offerCardDesciption.textContent = offerData.offer.description;
  offerCardPhotos.append(getPhotosFragment(offerData.offer.photos));

  return offerCard;
};

var Prices = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

var pageIsActive = false;

var adForm = document.querySelector('.ad-form');
// var adFormTitle = adForm.querySelector('#title');
var adFormAddress = adForm.querySelector('#address');
// var adFormType = adForm.querySelector('#type');
var adFormPrice = adForm.querySelector('#price');
var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');
var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
// var adFormFeatureWifi = adForm.querySelector('#feature-wifi');
// var adFormFeatureDishwasher = adForm.querySelector('#feature-dishwasher');
// var adFormFeatureWasher = adForm.querySelector('#feature-washer');
// var adFormFeatureElevator = adForm.querySelector('#feature-elevator');
// var adFormFeatureConditioner = adForm.querySelector('#feature-conditioner');
// var adFormDescription = adForm.querySelector('#description');
// var adFormImages = adForm.querySelector('#images');


var getCoords = function (block) {
  var box = block.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

};

var getMainPinCoords = function (pin, block) {
  var mapCoords = getCoords(block);
  var pinWidth = MainPinSize.WIDTH;
  var pinHeight = MainPinSize.HEIGHT;
  var pinCoordsX = Math.round(getCoords(pin).left + pinWidth / 2 - mapCoords.left);
  var pinCoordsY = Math.round(getCoords(pin).top + pinHeight - mapCoords.top);

  return {
    top: pinCoordsX,
    left: pinCoordsY
  };
};

var fillAddFormAddress = function (addrress) {
  var top = addrress.top;
  var left = addrress.left;
  adFormAddress.value = left + ', ' + top;
};

var changeTypeMinPrice = function (value) {
  value = Prices[value.toUpperCase()] || Prices.BUNGALO;
  adFormPrice.min = value;
  adFormPrice.placeholder = value;
};

var changeGuestCapacity = function (number) {
  adFormCapacity.length = 0;

  var fragment = RoomsCounts[number].reduce(function (acc, roomCount) {
    var option = document.createElement('option');
    option.value = roomCount;
    option.textContent = GuestCounts[roomCount];
    acc.append(option);

    return acc;
  }, new DocumentFragment());

  adFormCapacity.append(fragment);
};

adForm.addEventListener('change', function (evt) {
  var target = evt.target;
  var value = target.value;

  switch (target.id) {
    case 'timein':
      adFormTimeOut.value = value;
      break;
    case 'timeout':
      adFormTimeIn.value = value;
      break;
    case 'type':
      changeTypeMinPrice(value);
      break;
    case 'room_number':
      changeGuestCapacity(value);
      break;
    default:
      break;
  }
});

var toggleStateForm = function (form, flag) {
  var formElements = form.children;
  Array.prototype.forEach.call(formElements, function (formElement) {
    formElement.disabled = !flag;
  });
};

var togglePageState = function (flag) {
  pageIsActive = flag;
  toggleStateForm(adForm, flag);
  toggleStateForm(mapFilters, flag);
  map.classList.toggle('map--faded', !flag);
  adForm.classList.toggle('ad-form--disabled', !flag);
};

togglePageState(false);
fillAddFormAddress(getMainPinCoords(mapPinMain, map));

var activatePage = function () {
  togglePageState(true);
  changeGuestCapacity(adFormRoomNumber.value);
  fillMapOfPins(window.offerMocks, mapPins);
  fillAddFormAddress(getMainPinCoords(mapPinMain, map));
};

// var disablePage = function () {
//   togglePageState(false);
// };

var mapPinMainHandler = function () {
  if (pageIsActive) {
    // Drag & Drop
  } else {
    activatePage(true);
  }
};


mapPinMain.addEventListener('mousedown', mapPinMainHandler);
mapPinMain.addEventListener('keydown', mapPinMainHandler);
// var submit = document.querySelector('.ad-form__submit');

// var submitHandler = function (evt) {
//   evt.preventDefault();
//   togglePageState(false);
// };

// adForm.addEventListener('submit', submitHandler);
