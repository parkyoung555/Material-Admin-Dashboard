(function(){
  'use strict';

  angular.module('loginComponent')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('root.login', {
        url: '/login',
        views: {
          'content@root': {
            templateUrl: 'source/components/login/login.component.html',
            controller: 'loginComponent',
            controllerAs: 'loginVm'
          }
        },
        data: {
          pageTitle: 'Login',
          excludeFromNavigation: true
        }
      })
  }
  routeConfig.$inject = ['$stateProvider'];
})();
