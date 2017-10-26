(function(){
  'use strict';

  angular.module('loginComponent')
    .controller('passwordComponent', passwordComponent);

  function passwordComponent($rootScope, $scope, themeService, loginService) {
    var vm = this;

    vm.passwordFocus = true;

    vm.signIn = signIn;

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
    });

    /////////////////////////////////////////

    function signIn() {
      if(!vm.password) {
        return;
      }
      loginService.password = vm.password;
      $rootScope.$broadcast('login', true);
    }
  }
  passwordComponent.$inject = ['$rootScope', '$scope', 'themeService', 'loginService'];
})();
