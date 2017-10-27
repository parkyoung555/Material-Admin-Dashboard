(function (){
  'use strict';

  angular.module('dashboardApp')
    .run(appRun);

  function appRun($rootScope, $state, $transitions, widgetsUtilityService, navigationService, userService) {
    $rootScope.$state = $state;
    $transitions.onFinish({}, function(){
      widgetsUtilityService.reflowHighcharts();
    });
    $transitions.onSuccess({}, function(){
      navigationService.setPageActions();
    });
    $transitions.onExit({}, function(){
      userService.fluidGridOptions.draggable.enabled = false;
      userService.fluidGridOptions.resizable.enabled = false;
    });
  }
  appRun.$inject = ['$rootScope', '$state', '$transitions', 'widgetsUtilityService', 'navigationService', 'userService'];
})();
