'use strict';
(function () {
  var pageIsActive = false;

  var offer = {
    card: null,
    pin: null,
    active: function () {
      return !!this.pin;
    },
    clear: function () {
      this.card = null;
      this.pin = null;
    },
    set: function (card, pin) {
      this.card = card;
      this.pin = pin;
    }
  };

  window.data = {
    pageIsActive: pageIsActive,
    offer: offer
  };

})();
