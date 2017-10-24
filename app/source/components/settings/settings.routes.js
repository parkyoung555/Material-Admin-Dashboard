(function(){
  'use strict';

  angular.module('settingsComponent')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('root.settings', {
        url: '/settings',
        views: {
          'content@root': {
            templateUrl: 'source/components/settings/settings.component.html',
            controller: 'settingsComponent',
            controllerAs: 'settingsVm'
          }
        },
        data: {
          pageTitle: 'Settings',
          excludeFromNavigation: true
        }
      });
  }
  routeConfig.$inject = ['$stateProvider'];
})();
