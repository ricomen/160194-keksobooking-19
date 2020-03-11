'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  // var adFormTitle = adForm.querySelector('#title');
  var adFormAddress = adForm.querySelector('#address');
  var adFormType = adForm.querySelector('#type');
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
  var mapFilters = document.querySelector('.map__filters');

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

  var Prices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

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

  adForm.addEventListener('submit', formSubmitHandler);

  initForm();

  window.form = {
    fillAddress: fillAddress
  };

})();
