(function(){
  'use strict';

  angular.module('mainNavComponent')
    .controller('topNavComponent', topNavComponent);

  function topNavComponent($rootScope, $scope, $mdMedia, $mdSidenav, themeService, widgetsUtilityService, navigationService) {
    var vm = this;

    vm.isCompact = !$mdMedia('gt-md');
    vm.currentTheme = themeService.currentTheme;
    vm.pageActions = navigationService.pageActions;

    vm.toggleCompactMenu = toggleCompactMenu;
    vm.openNotificationsMenu = openNotificationsMenu;
    vm.mdColorsAttrValue = themeService.mdColorsAttrValue;

    $scope.$watch(function(){
      return $mdMedia('gt-md');
    }, function(md){
      vm.isCompact = !md;
      if(vm.isCompact) {
        $mdSidenav('side-nav-left').close();
      }
      $rootScope.$broadcast('isCompact', vm.isCompact);
    });

    $scope.$watch(function(){
      return navigationService.pageActions;
    }, function(pageActions){
      vm.pageActions = pageActions;
    });

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
    });

    $scope.$on('pageActions', function(ev, methods){
      vm.pageActionMethods = methods;
    });

    ////////////////////////////////

    function toggleCompactMenu() {
      if($mdMedia('gt-md')) {
        vm.isCompact = !vm.isCompact;
        $rootScope.$broadcast('isCompact', vm.isCompact);
      }

      $mdSidenav('side-nav-left').toggle().then(function() {
        widgetsUtilityService.reflowHighcharts();
      });
    }

    function openNotificationsMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    }
  }
  topNavComponent.$inject = ['$rootScope', '$scope', '$mdMedia', '$mdSidenav', 'themeService', 'widgetsUtilityService', 'navigationService'];
})();
