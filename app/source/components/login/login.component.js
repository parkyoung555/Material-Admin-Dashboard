(function(){
  'use strict';

  angular.module('loginComponent')
    .controller('loginComponent', loginComponent);

  function loginComponent(authService, themeService, $scope, $state, loginService) {
    var vm = this;

    vm.loading = false;
    vm.loginHistoryExists = !!loginService.getLoginHistory();

    vm.signInWithGoogle = signInWithGoogle;
    vm.signInWithFacebook = signInWithFacebook;
    vm.signInWithGithub = signInWithGithub;

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
    });

    $scope.$on('loginHeaders', function(ev, data){
      vm.subTitle = data.subTitle;
      vm.profileImage = data.profileImage;
    });

    $scope.$on('login', function(ev, data){
      if(loginService.email && loginService.password) {
        signInWithEmailAndPassword(loginService.email, loginService.password);
      }
    });

    $scope.$on('loginLoader', function(ev, data){
      vm.loading = data.loading;
      vm.loaderType = data.progress ? 'determinate' : 'indeterminate';
      vm.loaderProgress = data.progress
    });


    //////////////////////////////

    function signInWithEmailAndPassword(email, password) {
      vm.loading = true;

      authService.auth.$signInWithEmailAndPassword(email, password)
        .then(authSuccess)
        .catch(authFail);
    }

    function signInWithGoogle() {
      vm.loading = true;
      authService.auth.$signInWithPopup('google')
        .then(authSuccess)
        .catch(authFail);
    }

    function signInWithFacebook() {
      vm.loading = true;
      authService.auth.$signInWithPopup('facebook')
        .then(authSuccess)
        .catch(authFail);
    }

    function signInWithGithub() {
      vm.loading = true;
      authService.auth.$signInWithPopup('github')
        .then(authSuccess)
        .catch(authFail);
    }

    function authSuccess(d) {
      var user = d.user ? d.user : d;
      loginService.setLoginHistory({
        email: user.email,
        firstName: loginService.firstName,
        lastName: loginService.lastName
      });

      vm.loading = false;
      $state.go('root.home');
    }

    function authFail(error) {
      vm.loading = false;console.log(error);
      if(error.code === 'auth/user-not-found') {
        vm.emailInvalid = true;
        $state.go('login.email');
      } else if(error.code === 'auth/wrong-password') {
        vm.passwordInvalid = true;
        $state.go('login.password');
      }
    }
  }
  loginComponent.$inject = ['authService', 'themeService', '$scope', '$state', 'loginService'];
})();
