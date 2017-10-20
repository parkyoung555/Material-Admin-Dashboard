(function(){
  'use strict';

  angular.module('dashboardApp')
    .config(appConfig);

  function appConfig(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }
  appConfig.$inject = ['cfpLoadingBarProvider'];
})();
