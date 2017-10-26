(function(){
  'use strict';

  angular.module('loginComponent')
    .controller('loginComponent', loginComponent);

  function loginComponent($rootScope, authService, themeService, $scope, $state, userService, utilityService) {
    var vm = this,
      key = 'userData';

    vm.loaderValue = 68;
    vm.emailFocus = true;
    vm.passwordFocus = false;
    vm.loading = false;
    vm.email = 'parkyoung555@gmail.com';
    vm.pages = {
      email: {
        isActive: true,
        index: 0,
        header: 'Sign in'
      },
      password: {
        isActive: true,
        index: 1,
        header: 'Sign in'
      },
      newUser: {
        isActive: true,
        index: 2,
        header: 'Sign up',
        subHeader: 'Join us. We have cookies.'
      },
      signInOptions: {
        isActive: true,
        index: 3,
        header: 'Choose an account'
      }
    };
    vm.loginFormCurrentPage = vm.pages.email;
    vm.lastPage = {};
    vm.loginUserHistory = JSON.parse(localStorage.getItem(key));

    vm.goToTab = goToTab;
    vm.goBack = goBack;
    vm.findUser = findUser;
    vm.signInWithEmailAndPassword = signInWithEmailAndPassword;
    vm.signInWithGoogle = signInWithGoogle;
    vm.signInWithFacebook = signInWithFacebook;
    vm.signInWithGithub = signInWithGithub;
    vm.createAccount = createAccount;
    vm.chooseAccount = chooseAccount;
    vm.loginWithOldUser = loginWithOldUser;

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
    });

    //////////////////////////////

    function goToTab(page) {
      vm.loading = false;
      vm.lastPage = vm.loginFormCurrentPage;
      vm.subHeader = page.subHeader;
      switch (page.index) {
        case vm.pages.email.index:
          vm.emailFocus = true;
          vm.passwordFocus = false;
          break;
        case vm.pages.password.index:
          vm.emailFocus = false;
          vm.passwordFocus = true;
          break;
        case vm.pages.newUser.index:
          vm.newEmailFocus = true;
          break;
        default:
          vm.emailFocus = false;
          vm.passwordFocus = false;
      }
      vm.loginFormCurrentPage = page;
    }

    function goBack() {
      goToTab(vm.lastPage);
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

    function authSuccess(d) {console.log(d);
      // TODO: Make this better. Too lazy right now
      var currentData = localStorage.getItem(key),
        payload = currentData ? JSON.parse(currentData) : {};
      payload[utilityService.b64EncodeUnicode(vm.email)] = {
        email: vm.email,
        fullName: vm.firstName ? vm.firstName + ' ' + vm.lastName: d.displayName,
        profileImage: vm.profileImage
      };
      localStorage.setItem(key, JSON.stringify(payload));

      vm.loading = false;
      $state.go('root.home');
    }

    function authFail(error) {
      vm.loading = false;
      if(error.code === 'auth/user-not-found') {
        vm.emailInvalid = true;
        goToTab(vm.pages.email);
      } else if(error.code === 'auth/wrong-password') {
        vm.passwordInvalid = true;
        goToTab(vm.pages.password);
      }
    }

    function findUser() {
      if (!vm.email) {
        return;
      }
      vm.loading = true;
      userService.getUserInfo(vm.email)
        .then(function(data){
          vm.pages.password.subHeader = 'Hello, ' + data.firstName;
          vm.profileImage = userService.getGravatar(vm.email);
          vm.goToTab(vm.pages.password);
        })
        .catch(function(error){
          vm.name = void(0);
          vm.profileImage = void(0);
          goToTab(vm.pages.newUser);
        });
    }

    function createAccount() {
      if(!vm.newEmail || !vm.newPassword || !vm.confirmNewPassword) {
        return;
      }
      vm.email = vm.newEmail;
      goToTab(vm.pages.password);
    }

    function chooseAccount() {
      goToTab(vm.pages.signInOptions);
    }

    function loginWithOldUser(user) {
      if (user) {
        vm.email = user.email;
        vm.profileImage = user.profileImage;
        vm.pages.password.subHeader = user.fullName;
        goToTab(vm.pages.password);
      } else {
        vm.email = '';
        vm.password = '';
        vm.profileImage = '';
        goToTab(vm.pages.email);
      }
    }
  }
  loginComponent.$inject = ['$rootScope', 'authService', 'themeService', '$scope', '$state', 'userService', 'utilityService'];
})();
