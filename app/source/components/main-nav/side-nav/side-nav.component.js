(function(){
  'use strict';

  angular.module('mainNavComponent')
    .controller('sideNavComponent', sideNavComponent);

  function sideNavComponent($rootScope, $scope, $mdMedia, navigationService, themeService, authService, $state, userService) {
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

    getUserInfo();

    ///////////////////////////

    function openUserMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    }

    function signOut() {
      authService.signOut();
      $state.go('login');
    }

    function getUserInfo() {
      var auth = authService.auth.$getAuth();
      vm.profileImage = userService.getGravatar(auth.email);

      userService.getUserInfo(auth.email)
        .then(function(data){
          vm.fullName = data.firstName + ' ' + data.lastName;
          vm.title = data.title;
        })
        .catch(function(error){
          console.log(error);
        });
    }
  }
  sideNavComponent.$inject = ['$rootScope', '$scope', '$mdMedia', 'navigationService', 'themeService', 'authService', '$state', 'userService'];
})();
