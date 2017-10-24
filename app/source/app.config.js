(function(){
  'use strict';

  angular.module('dashboardApp')
    .config(appConfig);

  function appConfig(cfpLoadingBarProvider, $qProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    $qProvider.errorOnUnhandledRejections(false);

    var config = {
      apiKey: "AIzaSyALOcazSjA8KqaNDz8JXigpefnsDgd9WcY",
      authDomain: "admin-dashboard-56c0a.firebaseapp.com",
      databaseURL: "https://admin-dashboard-56c0a.firebaseio.com",
      projectId: "admin-dashboard-56c0a",
      storageBucket: "admin-dashboard-56c0a.appspot.com",
      messagingSenderId: "563137945075"
    };
    firebase.initializeApp(config);
  }
  appConfig.$inject = ['cfpLoadingBarProvider', '$qProvider'];
})();
