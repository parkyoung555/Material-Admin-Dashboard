(function(){
  'use strict';

  /**
   * @ngdoc overview
   * @name dashboardApp
   * @description
   * # dashboardApp
   *
   * Main router module.
   */
  angular
    .module('dashboardApp')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  }
  routeConfig.$inject = ['$routeProvider'];
})();
