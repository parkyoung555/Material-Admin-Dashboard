(function () {
  'use strict';

  angular.module('coreComponent')
    .service('utilityService', utilityService);

  function utilityService() {

    this.unCamelCase = unCamelCase;
    this.getMonths = getMonths;
    this.randomIntFromInterval = randomIntFromInterval;

    /////////////////////////

    function unCamelCase(str) {
      return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
    }

    function getMonths(month) {
      var months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']

      return month ? months[month] : months;
    }

    function randomIntFromInterval(min, max, precision) {
      precision = typeof precision === 'number' ? precision : 0;
      return parseFloat((Math.random()*(max-min+1)+min).toFixed(precision));
    }
  }

  utilityService.$inject = [];
})();
