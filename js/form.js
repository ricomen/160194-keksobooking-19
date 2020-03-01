'use strict';
(function () {
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
  var fillAddFormAddress = function (addrress) {
    var top = addrress.top;
    var left = addrress.left;
    adFormAddress.value = left + ', ' + top;
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

  window.form = {

  };
})();
