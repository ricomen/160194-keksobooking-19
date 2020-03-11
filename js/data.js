'use strict';
(function () {
  var pageIsActive = false;

  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 82
  };

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

  var offers = [];

  var OFFERS_MAX_NUM = 5;

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
