(function(){
  'use strict';

  /**
   * @ngdoc overview
   * @name dashboardApp
   * @description
   * # dashboardApp
   *
   * Main module of the application.
   */
  angular
    .module('dashboardApp', [
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.router',
      'ngMaterial',
      'highcharts-ng',
      'coreComponent',
      'widgetsComponent',
      'mainNavComponent',
      'homeComponent'
    ]);
})();
