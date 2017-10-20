(function(){
  'use strict';

  angular.module('mainNavComponent')
    .controller('sideNavComponent', sideNavComponent);

  function sideNavComponent($rootScope, $scope, $mdDialog, $mdMedia, navigationService, themeService) {
    var vm = this;

    vm.openUserMenu = openUserMenu;
    vm.isCompact = !$mdMedia('gt-md');
    vm.menuItems = navigationService.menuItems;

    $rootScope.$on('isCompact', function(event, data){
        vm.isCompact = data;
    });

    $scope.$watch(function(){
      return themeService.currentTheme;
    }, function(theme){
      vm.currentTheme = theme;
    });

    ///////////////////////////

    function openUserMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    }
  }
  sideNavComponent.$inject = ['$rootScope', '$scope', '$mdDialog', '$mdMedia', 'navigationService', 'themeService'];
})();
