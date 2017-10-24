(function(){
  'use strict';

  angular.module('loginComponent')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          '': {
            templateUrl: 'source/components/login/login.component.html',
            controller: 'loginComponent',
            controllerAs: 'loginVm'
          }
        }
      })
  }
  routeConfig.$inject = ['$stateProvider'];
})();
