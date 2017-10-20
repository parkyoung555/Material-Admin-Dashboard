(function(){
  'use strict';

  angular.module('mainNavComponent')
    .controller('topNavComponent', topNavComponent);

  function topNavComponent($rootScope, $scope, $mdMedia, $mdSidenav, themeService) {
    var vm = this;

    vm.isCompact = !$mdMedia('gt-md');
    vm.themes = themeService.availableThemes;
    vm.enableDarkMode = themeService.darkMode;
    vm.currentTheme = themeService.currentTheme;

    vm.toggleCompactMenu = toggleCompactMenu;
    vm.openSettingsMenu = openSettingsMenu;
    vm.changeTheme = changeTheme;
    vm.toggleDarkMode = toggleDarkMode;

    $scope.$watch(function(){
      window.dispatchEvent(new Event('resize'));
      return $mdMedia('gt-md');
    }, function(md){
      vm.isCompact = !md;
      $rootScope.$broadcast('isCompact', vm.isCompact);
    });

    ////////////////////////////////

    function toggleCompactMenu() {
      window.dispatchEvent(new Event('resize'));
      if($mdMedia('gt-md')) {
        vm.isCompact = !vm.isCompact;
        $rootScope.$broadcast('isCompact', vm.isCompact);
      }

      $mdSidenav('side-nav-left').toggle();
    }

    function openSettingsMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    }

    function changeTheme(theme) {
      vm.currentTheme = theme;
      themeService.currentTheme = theme;
    }

    function toggleDarkMode() {
      themeService.toggleDarkMode(vm.enableDarkMode);
    }
  }
  topNavComponent.$inject = ['$rootScope', '$scope', '$mdMedia', '$mdSidenav', 'themeService'];
})();
