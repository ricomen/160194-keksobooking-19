'use strict';
(function () {
  var map = document.querySelector('.map');
  var MAP_WIDTH = map.clientWidth;
  var OFFERS_COUNT = 8;

  var MapRanges = {
    VERT_MIN: 130,
    VERT_MAX: 630,
    HORIZ_MIN: 0,
    HORIZ_MAX: MAP_WIDTH,
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

  window.offerMocks = getMockOffers(OFFERS_COUNT);

})();