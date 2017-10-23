(function(){
  'use strict';

  angular.module('homeComponent')
    .controller('homeComponent', homeComponent);

  function homeComponent(widgetsUtilityService, $scope, $rootScope, $timeout, profileService) {
    var vm = this;

    vm.fluidGridOptions = profileService.fluidGridOptions;
    vm.activeWidgets = profileService.activeWidgets;
    vm.reorgModeActive = false;
    vm.removeWidget = profileService.removeWidget;

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
      profileService.fluidGridOptions.draggable.enabled = !profileService.fluidGridOptions.draggable.enabled;
      profileService.fluidGridOptions.resizable.enabled = !profileService.fluidGridOptions.resizable.enabled;

      vm.reorgModeActive = profileService.fluidGridOptions.draggable.enabled || profileService.fluidGridOptions.resizable.enabled;
      return vm.reorgModeActive;
    }
  }
  homeComponent.$inject = ['widgetsUtilityService', '$scope', '$rootScope', '$timeout', 'profileService'];
})();
