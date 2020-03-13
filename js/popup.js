'use strict';
(function () {
  var successPopupTpl = document.querySelector('#success').content.querySelector('.success');
  var errorPopupTpl = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var getPopup = function (type, cb) {

    var popup;
    if (type === 'error') {
      popup = errorPopupTpl.cloneNode(true);
      var popupButton = popup.querySelector('.error__button');

      var errorButtonHandler = function (evt) {
        if (window.utils.isMouseLeftPress(evt.button) || window.utils.isEscPress(evt.keyCode)) {
          popupButton.removeEventListener('click', errorButtonHandler);
          document.removeEventListener('click', errorButtonHandler);
          document.removeEventListener('keydown', errorButtonHandler);
          popup.remove();
        }

      };

      popupButton.addEventListener('click', errorButtonHandler);
      document.addEventListener('click', errorButtonHandler);
      document.addEventListener('keydown', errorButtonHandler);

    } else {
      popup = successPopupTpl.cloneNode(true);
      var popupHandler = function () {
        document.removeEventListener('click', popupHandler);
        document.removeEventListener('keydown', popupHandler);
        popup.remove();
        if (cb) {
          cb();
        }
      };

      document.addEventListener('click', popupHandler);
      document.addEventListener('keydown', popupHandler);
    }
    return popup;
  };

  var show = function (type, cb) {
    main.append(getPopup(type, cb));
  };

  window.popup = show;

})();
