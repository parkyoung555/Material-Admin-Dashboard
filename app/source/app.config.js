(function(){
  'use strict';

  angular.module('dashboardApp')
    .config(appConfig);

  function appConfig(cfpLoadingBarProvider, $qProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    $qProvider.errorOnUnhandledRejections(false);
  }
  appConfig.$inject = ['cfpLoadingBarProvider', '$qProvider'];
})();
