(function(){
  'use strict';

  angular.module('mainNavComponent')
    .controller('sideNavComponent', sideNavComponent);

  function sideNavComponent($rootScope, $scope, $mdDialog, $mdMedia, navigationService, themeService, authService, $state) {
    var vm = this;

    vm.openUserMenu = openUserMenu;
    vm.signOut = signOut;

    vm.isCompact = !$mdMedia('gt-md');
    vm.menuItems = navigationService.menuItems;
    vm.mdColorsAttrValue = themeService.mdColorsAttrValue;

    $rootScope.$on('isCompact', function(event, data){
        vm.isCompact = data;
    });

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
    });

    ///////////////////////////

    function openUserMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    }

    function signOut() {
      authService.signOut();
      $state.go('login');
    }
  }
  sideNavComponent.$inject = ['$rootScope', '$scope', '$mdDialog', '$mdMedia', 'navigationService', 'themeService', 'authService', '$state'];
})();
