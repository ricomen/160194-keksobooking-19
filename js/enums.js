'use strict';
(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 82
  };

  var KeyCodes = {
    ENTER: 13,
    ESC: 27,
    MOUSE_LEFT: 0
  };

  var ErrorCodes = {
    404: 'Страница не найдена. Неправильный url',
    SYNTAX_ERROR: 'Невалидные данные с сервера. Попробуйте позже',
    TIMEOUT: 'время подключение истекло. Попробуйте позже',
    0: 'Отсутствует соединение с интернетом. Попробуйте ещё раз!'
  };

  window.enums = {
    PinSize: PinSize,
    MainPinSize: MainPinSize,
    ErrorCodes: ErrorCodes,
    KeyCodes: KeyCodes
  };

})();
