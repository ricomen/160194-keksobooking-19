'use strict';
(function () {
  var pageIsActive = false;

  var offer = {
    card: null,
    pin: null,
    cards: [],
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

  var OFFER_NUMBER = 5;

  var mainPinStartCoords = {
    top: 375,
    left: 570
  };

  window.data = {
    pageIsActive: pageIsActive,
    offer: offer,
    mainPinStartCoords: mainPinStartCoords,
    OFFER_NUMBER: OFFER_NUMBER
  };

})();
