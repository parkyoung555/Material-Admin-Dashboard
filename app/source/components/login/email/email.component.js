(function(){
  'use strict';

  angular.module('loginComponent')
    .controller('emailComponent', emailComponent);

  function emailComponent($rootScope, $state, userService, loginService) {

    var vm = this;

    vm.email = loginService.email;

    vm.goToPassword = goToPassword;
    vm.checkIfUserExists = checkIfUserExists;

    $rootScope.$broadcast('loginHeaders', {
      subTitle: '',
      profileImage: ''
    });

    ////////////////////////////////////

    function goToPassword() {
      if(!vm.email) {
        return;
      }

      checkIfUserExists();
    }

    function checkIfUserExists() {
      if (!vm.email) {
        return;
      }
      vm.loading = true;
      return userService.getUserInfo(vm.email)
        .then(function(data){
          $rootScope.$broadcast('loginHeaders', {
            subTitle: 'Hello, ' + data.firstName,
            profileImage: userService.getGravatar(vm.email)
          });

          loginService.email = vm.email;
          $state.go('login.password');
        })
        .catch(function(error){
          // New user
          loginService.email = vm.email;
          $state.go('login.signUp');
        });
    }
  }
  emailComponent.$inject = ['$rootScope', '$state', 'userService', 'loginService'];
})();
