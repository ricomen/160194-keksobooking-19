'use strict';
var map = document.querySelector('.map');
var MAP_WIDTH = map.clientWidth;
var OFFERS_COUNT = 8;

var MapRanges = {
  VERT_MIN: 130,
  VERT_MAX: 630,
  HORIZ_MIN: 0,
  HORIZ_MAX: MAP_WIDTH,
};

var PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

var MainPinSize = {
  WIDTH: 50,
  HEIGHT: 82
};

var AVATAR_URLS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var TITLES = [
  'Уютное гнездышко для молодоженов',
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке',
  'Императорский дворец в центре Токио',
  'Милейший чердачок',
  'Наркоманский притон',
  'Чёткая хата',
  'Стандартная квартира в центре',
  'Тихая квартирка недалеко от метро',
  'Милое гнездышко для фанатов Анимэ'
];

var ADRESSES = [
  '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
  '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
  'Chiyoda-ku, Tōkyō-to 102-0091',
  '1-1 Chiyoda, Chiyoda-ku, Tōkyō-to 100-8111',
  '102-0094 Tōkyō-to, Chiyoda-ku, Kioichō, 3',
  '102-0081 Tōkyō-to, Chiyoda-ku, Yonbanchō, 5−6',
  'Chiyoda-ku, Tōkyō-to 102-0082',
  '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 17−4102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 17−4',
  '105-0003 Tōkyō-to, Minato-ku, Nishishinbashi, 2 Chome−3'
];

var DESCRIPTIONS = [
  'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'Маленькая квартирка на чердаке. Для самых не требовательных.',
  'У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
  'Азиатов просьба не беспокоить.'
];

var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var Rooms = {
  MIN: 1,
  MAX: 3
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

var Guests = {
  MIN: 1,
  MAX: 10
};

var RoomPrices = {
  MIN: 300,
  MAX: 3000
};

var shuffleArray = function (array) {
  var newArray = array.slice();
  for (var i = newArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t1 = newArray[i];
    var t2 = newArray[j];
    newArray[i] = t2;
    newArray[j] = t1;
  }
  return newArray;
};


var makeGetRandomAvatarUrlFunction = function (arr) {
  var shuffledAvatarUrls = shuffleArray(arr);
  var i = 0;

  return function () {
    if (i >= shuffledAvatarUrls.length) {
      shuffledAvatarUrls = shuffleArray(arr);
      i = 0;
    }
    return shuffledAvatarUrls[i++];
  };
};

var getAvatarUrl = makeGetRandomAvatarUrlFunction(AVATAR_URLS);

var getRandomItemFromArray = function (arr) {
  return arr[getRandomInt(arr.length)];
};

var getRandomInt = function (val) {
  return Math.floor(Math.random() * Math.floor(val));
};

var getRandomFromRange = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var getArrOfStrings = function (strings) {
  var arr = [];
  var length = getRandomFromRange(1, strings.length);
  for (var i = 0; i < length; i++) {
    arr.push(strings[i]);
  }
  return arr;
};

var getMockOffer = function () {
  return {
    author: {
      avatar: getAvatarUrl(),
    },
    offer: {
      title: getRandomItemFromArray(TITLES),
      address: getRandomItemFromArray(ADRESSES),
      price: getRandomFromRange(RoomPrices.MIN, RoomPrices.MAX),
      type: getRandomItemFromArray(TYPES),
      rooms: getRandomFromRange(Rooms.MIN, Rooms.MAX),
      guests: getRandomFromRange(Guests.MIN, Guests.MAX),
      checkin: getRandomItemFromArray(TIMES),
      checkout: getRandomItemFromArray(TIMES),
      features: getArrOfStrings(FEATURES),
      description: getRandomItemFromArray(DESCRIPTIONS),
      photos: getArrOfStrings(PHOTOS),
    },
    location: {
      x: getRandomFromRange(MapRanges.HORIZ_MIN, MapRanges.HORIZ_MAX),
      y: getRandomFromRange(MapRanges.VERT_MIN, MapRanges.VERT_MAX)
    }
  };
};

var getMockOffers = function (size) {
  var arr = [];
  for (var i = 0; i < size; i++) {
    arr.push(getMockOffer());
  }
  return arr;
};

var offerMocks = getMockOffers(OFFERS_COUNT);

var mapPins = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var mapFilters = map.querySelector('.map__filters');
var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');

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

  return pinNode;
};

var fillMapOfPins = function (pins, target) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(getMapPinNode(pins[i]));
  }
  target.appendChild(fragment);
};

var filterContainer = document.querySelector('.map__filters-container');

var offerdCardTpl = document.querySelector('#card').content.querySelector('.map__card');

var makeCardOffer = function (mocks) {
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

  var offerData = mocks[0];
  offerCardAvatar.src = offerData.author.avatar;
  offerCardTitle.textContent = offerData.offer.title;
  offerCardAddress.textContent = offerData.offer.address;
  offerCardPrice.textContent = offerData.offer.price + ' ₽/ночь';
  offerCardType.textContent = getHousingType(offerData.offer.type);
  offerCardCapacity.textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests;
  offerCardTime.textContent = 'Заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout;
  offerCardFeatures.append(getFeaturesFragment(offerData.offer.features));
  filterContainer.before(offerCard);
  offerCardDesciption.textContent = offerData.offer.description;
  offerCardPhotos.appendChild(getPhotosFragment(offerData.offer.photos));
};

makeCardOffer(offerMocks);

var Price = {
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

// Получение коорбинат блока
var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();

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
  var minValue = 0;

  switch (value) {
    case 'bungalo':
      minValue = Price.BUNGALO;
      break;
    case 'flat':
      minValue = Price.FLAT;
      break;
    case 'house':
      minValue = Price.HOUSE;
      break;
    case 'palace':
      minValue = Price.PALACE;
      break;
    default:
      break;
  }

  adFormPrice.min = minValue;
  adFormPrice.placeholder = minValue;
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
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = flag;
  }
};

var togglePageState = function (flag) {
  pageIsActive = flag;
  if (flag) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    toggleStateForm(adForm, false);
    toggleStateForm(mapFilters, false);

  } else {

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    toggleStateForm(adForm, true);
    toggleStateForm(mapFilters, true);

  }
};

// togglePageState(false);
fillAddFormAddress(getMainPinCoords(mapPinMain, map));

var activatePage = function () {
  togglePageState(true);
  changeGuestCapacity(adFormRoomNumber.value);
  fillMapOfPins(getMockOffers(OFFERS_COUNT), mapPins);
  fillAddFormAddress(getMainPinCoords(mapPinMain, map));
};

// var disablePage = function () {
//   togglePageState(false);
// };

var mapPinMainHandler = function () {
  if (!pageIsActive) {
    activatePage(true);
  } else {
    // Drag & Drop
  }
};


mapPinMain.addEventListener('mousedown', mapPinMainHandler);
mapPinMain.addEventListener('keydown', mapPinMainHandler);
// var submit = document.querySelector('.ad-form__submit');

// var submitHandler = function (evt) {
// evt.preventDefault();
// console.log( new FormData(evt.target).get(adFormAddress));
// };

// adForm.addEventListener('submit', submitHandler);
