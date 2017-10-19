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
        }
      })
  }
  routeConfig.$inject = ['$stateProvider'];
})();
