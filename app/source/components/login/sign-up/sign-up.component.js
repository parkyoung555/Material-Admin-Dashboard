(function(){
  'use strict';

  angular.module('loginComponent')
    .controller('signUpComponent', signUpComponent);

  function signUpComponent($scope, themeService, authService, loginService, userService, $state, $mdToast) {
    var vm = this,
      toast = $mdToast.simple()
        .hideDelay(6000)
        .highlightAction(true)
        .highlightClass('md-accent');

    vm.currentStep = 0;
    vm.newEmail = loginService.email;
    vm.newEmailFocus = false;
    vm.newPasswordFocus = false;

    vm.createAccount = createAccount;
    vm.nextStep = nextStep;
    vm.resetValidity = resetValidity;

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
    });

    ///////////////////////////////

    function createAccount() {
      if(dataValid()) {
        authService.auth.$createUserWithEmailAndPassword(vm.newEmail, vm.newPassword)
          .then(success)
          .catch(error);
      }
    }

    function success() {
      // Add additional user data
      userService.setUserInfo(vm.newEmail, {
        firstName: vm.newFirstName,
        lastName: vm.newLastName,
        title: vm.title
      })
        .then(function(){
          toast
            .textContent('Account created!')
            .action('OK');
          $state.go('login.email');
        })
        .catch(function(error){
          console.log(error);
          toast
            .textContent('Looks like something went wrong.')
            .action('OK');
          $mdToast.show(toast);
          $state.go('login.email');
        });
    }

    function error(err) {
      console.error(err);
    }

    function dataValid() {
      if(!vm.newFirstName || !vm.newFirstName || !vm.title ||
      !vm.newPassword || !vm.confirmNewPassword) {
        return false;
      }

      if(vm.newPassword !== vm.confirmNewPassword) {
        $scope.signUpPasswordForm.confirmNewPassword.$setValidity('passwordMismatch', false);
        return false;
      }

      return true;
    }

    function resetValidity() {
      if(vm.confirmNewPassword) {
        $scope.signUpPasswordForm.confirmNewPassword.$setValidity('passwordMismatch', true);
      }
    }

    function nextStep() {
      if(loginService.email) {
        vm.newPasswordFocus = true;
      } else {
        vm.newEmailFocus = true;
      }
      vm.currentStep++;
    }
  }
  signUpComponent.$inject = ['$scope', 'themeService', 'authService', 'loginService', 'userService', '$state', '$mdToast'];
})();
