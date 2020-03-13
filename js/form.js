'use strict';
(function () {
  var DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var Prices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
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

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormAvatar = document.querySelector('#avatar');
  var adFormAvatarPreview = document.querySelector('.ad-form-header__preview img');
  var adFormPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var adFormAddress = adForm.querySelector('#address');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var mapFilters = document.querySelector('.map__filters');

  var fillAddress = function () {
    var getMainPinCoords = function () {
      var mapCoords = window.utils.getCoords(map);
      var pinWidth = window.data.MainPinSize.WIDTH;
      var pinHeight = window.data.MainPinSize.HEIGHT;
      var pinCoordsX = Math.round(window.utils.getCoords(mapPinMain).left + pinWidth / 2 - mapCoords.left);
      var pinCoordsY = Math.round(window.utils.getCoords(mapPinMain).top + pinHeight - mapCoords.top);

      return {
        x: pinCoordsX,
        y: pinCoordsY
      };
    };
    var coords = getMainPinCoords();

    adFormAddress.value = coords.x + ', ' + coords.y;
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

  var getImagePreview = function (file, cb) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (cb) {
          cb(reader.result);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  var onAvatarHanler = function (evt) {
    var file = evt.target.files[0];
    getImagePreview(file, function (data) {
      adFormAvatarPreview.src = data;
    });
  };

  var photoContainer = document.querySelector('.ad-form__photo-container');

  var getHousePhotos = function (files) {
    var photos = Object.values(files).reduce(function (acc, file) {
      var div = document.createElement('div');
      var img = document.createElement('img');
      img.width = 40;
      img.height = 44;
      div.append(img);
      div.className = 'ad-form__photo';
      getImagePreview(file, function (data) {
        img.src = data;
      });
      acc.append(div);

      return acc;
    }, new DocumentFragment());

    return photos;
  };

  var onHousePicHanler = function (evt) {
    var photos = getHousePhotos(evt.target.files);
    photoContainer.append(photos);
  };

  var avatarReset = function () {
    adFormAvatarPreview.src = DEFAULT_AVATAR_URL;
  };

  var housePicReset = function () {
    var photos = adForm.querySelectorAll('.ad-form__photo');
    if (photos) {
      photos.forEach(function (file) {
        file.remove();
      });
    }
  };

  adFormAvatar.addEventListener('change', onAvatarHanler);
  adFormPhoto.addEventListener('change', onHousePicHanler);

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

  var onFilterChange = window.utils.debounce(function () {
    var filteredData = window.filter();
    window.map.clear();
    window.map.fill(filteredData);
  });

  mapFilters.addEventListener('change', onFilterChange);

  var initForm = function () {
    mapFilters.reset();
    adForm.reset();
    avatarReset();
    housePicReset();
    changeTypeMinPrice(adFormType.value);
    changeGuestCapacity(adFormRoomNumber.value);
    fillAddress();
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    var data = new FormData(adForm);
    window.request({
      url: 'https://js.dump.academy/keksobooking',
      method: 'POST',
      onSuccess: function () {
        window.popup('success', function () {
          initForm();
          window.map.reset();
          window.utils.togglePageState(false);
        });
      },
      onError: function () {
        window.popup('error');
      },
      body: data
    });
  };

  var formResetHanlder = function (evt) {
    evt.preventDefault();
    window.map.reset();
    initForm();
    window.utils.togglePageState(false);
  };

  adForm.addEventListener('submit', formSubmitHandler);
  adFormReset.addEventListener('click', formResetHanlder);

  initForm();

  window.form = {
    fillAddress: fillAddress
  };

})();
