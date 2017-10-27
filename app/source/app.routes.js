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

  function routeConfig($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider
      .state('root', {
        views: {
          '': {
            abstract: true,
            controller: 'rootComponent',
            controllerAs: 'rootVm',
            templateUrl: 'source/app.component.html'
          },
          'topNav@root': {
            templateUrl: 'source/components/main-nav/top-nav/top-nav.component.html',
            controller: 'topNavComponent',
            controllerAs: 'topNavVm'
          },
          'sideNav@root': {
            templateUrl: 'source/components/main-nav/side-nav/side-nav.component.html',
            controller: 'sideNavComponent',
            controllerAs: 'sideNavVm'
          }
        },
        resolve: {
          currentAuth: ['authService', function(authService) {
            return authService.requireSignIn();
          }]
        }
      });

    $urlRouterProvider.otherwise('/');
    // $locationProvider.html5Mode(true);
  }
  routeConfig.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider'];
})();
