(function(){
  'use strict';

  angular.module('homeComponent')
    .controller('homeComponent', homeComponent);

  function homeComponent(widgetsUtilityService, $scope, $rootScope, $timeout, userService) {
    var vm = this;

    vm.fluidGridOptions = userService.fluidGridOptions;
    vm.activeWidgets = userService.activeWidgets;
    vm.reorgModeActive = false;
    vm.removeWidget = userService.removeWidget;

    $scope.$on('isCompact', function(ev, data) {
      $timeout(function(){
        widgetsUtilityService.reflowHighcharts();
      }, 500);
    });

    $rootScope.$broadcast('pageActions', {
      toggleReorgMode: toggleReorgMode
    });

    ////////////////////////////////

    function toggleReorgMode() {
      userService.fluidGridOptions.draggable.enabled = !userService.fluidGridOptions.draggable.enabled;
      userService.fluidGridOptions.resizable.enabled = !userService.fluidGridOptions.resizable.enabled;

      vm.reorgModeActive = userService.fluidGridOptions.draggable.enabled || userService.fluidGridOptions.resizable.enabled;
      return vm.reorgModeActive;
    }
  }
  homeComponent.$inject = ['widgetsUtilityService', '$scope', '$rootScope', '$timeout', 'userService'];
})();
