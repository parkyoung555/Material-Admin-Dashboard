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
      'firebase',
      'highcharts-ng',
      'angular-loading-bar',
      'fluidGrid',
      'coreComponent',
      'widgetsComponent',
      'mainNavComponent',
      'loginComponent',
      'settingsComponent',
      'homeComponent',
      'contactsComponent'
    ]);
})();
