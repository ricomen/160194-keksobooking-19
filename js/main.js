'use strict';
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
map.classList.remove('map--faded');

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
  'conditione'
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

var Guests = {
  MIN: 1,
  MAX: 10
};

var RoomPrices = {
  MIN: 300,
  MAX: 3000
};

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

var getAvatarUrl = function (arr) {
  return arr.splice(getRandomInt(arr.length), 1);
};

var getArrOfRoomPhotos = function (photos) {
  var arr = [];
  var length = getRandomFromRange(1, photos.length);
  for (var i = 0; i < length; i++) {
    arr.push(photos[i]);
  }

  return arr;
};

var getMockOffer = function () {
  return {
    author: {
      avatar: getAvatarUrl(AVATAR_URLS),
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
      features: getRandomItemFromArray(FEATURES),
      description: getRandomItemFromArray(DESCRIPTIONS),
      photos: getArrOfRoomPhotos(PHOTOS),
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

fillMapOfPins(getMockOffers(OFFERS_COUNT), mapPins);
