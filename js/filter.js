'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');

  var RangeOfPrices = {
    ANY: {min: 0, max: Infinity},
    MIDDLE: {min: 10000, max: 50000},
    LOW: {min: 0, max: 10000},
    HIGH: {min: 50000, max: Infinity}
  };

  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelectorAll('#housing-features input[type="checkbox"]');

  var byHousingType = function (offer, value) {
    var typeHouse = offer.offer.type;

    return value === 'any' ? true : typeHouse === value;
  };

  var byHousingPrice = function (offer, value) {
    var offerPrice = offer.offer.price;
    var filterValue = value.toUpperCase();

    return offerPrice >= RangeOfPrices[filterValue].min && offerPrice <= RangeOfPrices[filterValue].max;
  };

  var byHousingRooms = function (offer, value) {
    var offerRooms = offer.offer.rooms;

    return value === 'any' ? true : offerRooms === +value;
  };

  var byHiusingGuests = function (offer, value) {
    var offerGuests = offer.offer.guests;

    return value === 'any' ? true : offerGuests === +value;
  };

  var byFeatures = function (offer, value) {
    var arr1 = offer.offer.features;
    var arr2 = value;

    return arr2.every(function (val) {
      return arr1.indexOf(val) !== -1;
    });
  };

  var filter = function () {
    var offers = window.data.offers.slice();
    var getFeatures = Array.prototype.reduce.call(housingFeatures, function (acc, feature) {
      if (feature.checked) {
        acc.push(feature.value);
      }

      return acc;
    }, []);
    var result = offers.filter(function (offer) {
      return byHousingType(offer, housingType.value) &&
        byHousingPrice(offer, housingPrice.value) &&
        byHousingRooms(offer, housingRooms.value) &&
        byHiusingGuests(offer, housingGuests.value) &&
        byFeatures(offer, getFeatures);
    });

    return result;
  };

  window.filter = filter;
})();
