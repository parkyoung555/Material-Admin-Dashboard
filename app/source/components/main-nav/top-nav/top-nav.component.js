(function(){
  'use strict';

  angular.module('mainNavComponent')
    .controller('topNavComponent', topNavComponent);

  function topNavComponent($rootScope, $scope, $mdMedia, $mdSidenav, themeService) {
    var vm = this;

    vm.isCompact = !$mdMedia('gt-md');
    vm.currentTheme = themeService.currentTheme;

    vm.toggleCompactMenu = toggleCompactMenu;
    vm.openNotificationsMenu = openNotificationsMenu;
    vm.mdColorsAttrValue = themeService.mdColorsAttrValue;

    $scope.$watch(function(){
      // window.dispatchEvent(new Event('resize'));
      return $mdMedia('gt-md');
    }, function(md){
      vm.isCompact = !md;
      $rootScope.$broadcast('isCompact', vm.isCompact);
    });

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
    });

    ////////////////////////////////

    function toggleCompactMenu() {
      // window.dispatchEvent(new Event('resize'));
      if($mdMedia('gt-md')) {
        vm.isCompact = !vm.isCompact;
        $rootScope.$broadcast('isCompact', vm.isCompact);
      }

      $mdSidenav('side-nav-left').toggle();
    }

    function openNotificationsMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    }
  }
  topNavComponent.$inject = ['$rootScope', '$scope', '$mdMedia', '$mdSidenav', 'themeService'];
})();
