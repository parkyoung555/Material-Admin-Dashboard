(function () {
  'use strict';

  angular.module('coreComponent')
    .service('utilityService', utilityService);

  function utilityService() {

    this.unCamelCase = unCamelCase;

    /////////////////////////

    function unCamelCase(str) {
      return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
    }
  }

  utilityService.$inject = [];
})();
