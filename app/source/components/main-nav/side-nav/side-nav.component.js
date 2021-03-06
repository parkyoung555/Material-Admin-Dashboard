(function(){
  'use strict';

  angular.module('mainNavComponent')
    .controller('sideNavComponent', sideNavComponent);

  function sideNavComponent($rootScope, $scope, $mdMedia, navigationService, themeService, authService, $state, userService, loginService, $mdSidenav) {
    var vm = this;

    vm.openUserMenu = openUserMenu;
    vm.signOut = signOut;
    vm.toggleCompactMenu = toggleCompactMenu;

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
      loginService.logout();
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

    function toggleCompactMenu() {
      if($mdMedia('gt-md')) {
        vm.isCompact = !vm.isCompact;
        $rootScope.$broadcast('isCompact', vm.isCompact);
      }

      $mdSidenav('side-nav-left').toggle().then(function() {
        widgetsUtilityService.reflowHighcharts();
      });
    }
  }
  sideNavComponent.$inject = ['$rootScope', '$scope', '$mdMedia', 'navigationService', 'themeService', 'authService', '$state', 'userService', 'loginService', '$mdSidenav'];
})();
