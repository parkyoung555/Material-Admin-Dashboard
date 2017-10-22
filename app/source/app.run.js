(function (){
  'use strict';

  angular.module('dashboardApp')
    .run(appRun);

  function appRun($rootScope, $state, $transitions, widgetsUtilityService, navigationService, profileService) {
    $rootScope.$state = $state;
    $transitions.onFinish({}, function(){
      widgetsUtilityService.reflowHighcharts();
    });
    $transitions.onSuccess({}, function(){
      navigationService.setPageActions();
    });
    $transitions.onExit({}, function(){
      profileService.fluidGridOptions.draggable.enabled = false;
      profileService.fluidGridOptions.resizable.enabled = false;
    });
  }
  appRun.$inject = ['$rootScope', '$state', '$transitions', 'widgetsUtilityService', 'navigationService', 'profileService'];
})();
