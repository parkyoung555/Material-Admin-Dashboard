(function(){
  'use strict';

  angular.module('homeComponent')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('root.home', {
        url: '/',
        views: {
          'content@root': {
            templateUrl: 'source/components/home/home.component.html',
            controller: 'homeComponent',
            controllerAs: 'homeVm'
          }
        },
        data: {
          pageTitle: 'Dashboard',
          menuIcon: 'dashboard',
          priority: 1,
          actions: [
            {
              label: 'Reorganize',
              icon: 'pan_tool',
              method: 'toggleReorgMode',
              toggle: {
                label: 'Set',
                icon: 'check'
              }
            }
          ]
        }
      });
  }
  routeConfig.$inject = ['$stateProvider'];
})();
