'use strict';
(function () {
  var OFFERS_MAX_NUM = 5;

  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var MainPinSize = {
    WIDTH: 64,
    HEIGHT: 82
  };

  var pageIsActive = false;

  var offers = [];

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

  var mainPinStartCoords = {
    top: 375,
    left: 570
  };

  window.data = {
    pageIsActive: pageIsActive,
    offer: offer,
    mainPinStartCoords: mainPinStartCoords,
    OFFERS_MAX_NUM: OFFERS_MAX_NUM,
    offers: offers,
    PinSize: PinSize,
    MainPinSize: MainPinSize,
  };

})();
