(function(){
  'use strict';

  angular.module('mainNavComponent')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('root', {
        views: {
          'topNav@': {
            templateUrl: 'source/components/main-nav/top-nav/top-nav.component.html',
            controller: 'topNavComponent',
            controllerAs: 'topNavVm'
          },
          'sideNav@': {
            templateUrl: 'source/components/main-nav/side-nav/side-nav.component.html',
            controller: 'sideNavComponent',
            controllerAs: 'sideNavVm'
          }
        }
      });
  }
  routeConfig.$inject = ['$stateProvider'];
})();
