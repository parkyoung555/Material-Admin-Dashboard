(function () {
  'use strict';

  angular.module('coreComponent')
    .service('utilityService', utilityService);

  function utilityService() {

    this.unCamelCase = unCamelCase;
    this.camelToDash = camelToDash;
    this.getMonths = getMonths;
    this.randomIntFromInterval = randomIntFromInterval;
    this.b64EncodeUnicode = b64EncodeUnicode;
    this.b64DecodeUnicode = b64DecodeUnicode;

    /////////////////////////

    function unCamelCase(str) {
      return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
    }

    function camelToDash(str) {
      return str.replace(/([A-Z])/g, function(g){ return '-' + g[0].toLowerCase(); });
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

    function b64EncodeUnicode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
        }));
    }

    function b64DecodeUnicode(str) {
      return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
  }

  utilityService.$inject = [];
})();
