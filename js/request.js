'use strict';
(function () {
  var data = [];

  var request = function (settings) {
    var url = settings.url;
    var method = settings.method;
    var onSuccess = settings.onSuccess;
    var onError = settings.onError;
    var body = settings.body;
    var http = new XMLHttpRequest();

    var loadCompleted = function () {
      if (http.status === 200) {
        // если в процессе запроса мы ловим ошибку, выводим окно с ошибкой на страницу.
        try {
          JSON.parse(http.responseText);
        } catch (e) {
          onError('SyntaxError', window.enums.ErrorCodes['SYNTAX_ERROR']);
          return;
        }
        data = JSON.parse(http.responseText);
        onSuccess(data);
        return;
      }

      onError(http.status, window.enums.ErrorCodes[http.status]);
    };

    var onTimeout = function () {
      onError('Timeout', window.enums.ErrorCodes['TIMEOUT']);
    };

    var onFail = function () {
      onError(http.status, window.enums.ErrorCodes[http.status]);
    };

    var sendCompleted = function () {
      if (http.status === 200) {

        onSuccess(data);
        return;

      }
      onError(data);
    };

    http.addEventListener('timeout', onTimeout);
    http.addEventListener('error', onFail);

    if (method === 'GET') {

      http.addEventListener('load', loadCompleted);
      http.open(method, url);
      http.send();

    } else {

      http.addEventListener('load', sendCompleted);
      http.open(method, url);
      http.send(body);

    }
  };
  window.request = request;
})();
