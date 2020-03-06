'use strict';
(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  var isEscPress = function (keyCode) {
    return keyCode === window.enums.KeyCodes.ESC;
  };

  var isEnterPress = function (keyCode) {
    return keyCode === window.enums.KeyCodes.ENTER;
  };

  var mouseLeftPress = function (keyCode) {
    return keyCode === window.enums.KeyCodes.MOUSE_LEFT;
  };

  var getCoords = function (block) {
    var box = block.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  };

  var toggleStateForm = function (form, flag) {
    var formElements = form.children;
    Array.prototype.forEach.call(formElements, function (formElement) {
      formElement.disabled = !flag;
    });
  };

  var togglePageState = function (flag) {
    window.data.pageIsActive = flag;
    toggleStateForm(adForm, flag);
    toggleStateForm(mapFilters, flag);
    map.classList.toggle('map--faded', !flag);
    adForm.classList.toggle('ad-form--disabled', !flag);
    window.form.fillAddress();
  };

  var activatePage = function () {
    togglePageState(true);
    window.request({
      url: 'https://js.dump.academy/keksobooking/data',
      method: 'GET',
      onSuccess: window.map.fillMap,
      onError: function () {
        // console.log('чет пошло не так');
      }
    });
  };

  window.utils = {
    getCoords: getCoords,
    toggleStateForm: toggleStateForm,
    togglePageState: togglePageState,
    activatePage: activatePage,
    isEscPress: isEscPress,
    isEnterPress: isEnterPress,
    mouseLeftPress: mouseLeftPress
  };

})();
