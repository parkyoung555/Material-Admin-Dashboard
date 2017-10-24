(function(){
  'use strict';

  angular.module('loginComponent')
    .controller('loginComponent', loginComponent);

  function loginComponent(authService, themeService, $scope, $state) {
    var vm = this;

    vm.loginFormIndex = 0;
    vm.loaderValue = 68;
    vm.emailFocus = true;
    vm.passwordFocus = false;
    vm.loading = false;

    vm.goToTab = goToTab;
    vm.signInWithEmailAndPassword = signInWithEmailAndPassword;
    vm.signInWithGoogle = signInWithGoogle;
    vm.signInWithFacebook = signInWithFacebook;

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
    });

    //////////////////////////////

    function goToTab(tabIndex) {
      switch (tabIndex) {
        case 0:
          vm.emailFocus = true;
          vm.passwordFocus = false;
          break;
        case 1:
          vm.emailFocus = false;
          vm.passwordFocus = true;
          break;
        default:
          vm.emailFocus = true;
          vm.passwordFocus = false;
      }
      vm.loginFormIndex = tabIndex;
    }

    function signInWithEmailAndPassword() {
      if(!vm.email || !vm.password) return false;
      vm.loading = true;

      authService.auth.$signInWithEmailAndPassword(vm.email, vm.password)
        .then(authSuccess)
        .catch(authFail);
    }

    function signInWithGoogle() {
      vm.loading = true;
      return authObj.$signInWithPopup("google")
        .then(authSuccess)
        .catch(authFail);
    }

    function signInWithFacebook() {
      vm.loading = true;
      return authObj.$signInWithPopup("facebook")
        .then(authSuccess)
        .catch(authFail);
    }

    function authSuccess() {
      vm.loading = false;
      $state.go('root.home');
    }

    function authFail(error) {
      vm.loading = false;
      if(error.code === 'auth/user-not-found') {
        vm.emailInvalid = true;
        goToTab(0);
      } else if(error.code === 'auth/wrong-password') {
        vm.passwordInvalid = true;
        goToTab(1);
      }
    }
  }
  loginComponent.$inject = ['authService', 'themeService', '$scope', '$state'];
})();
