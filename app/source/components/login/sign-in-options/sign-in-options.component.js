(function(){
  'use strict';

  angular.module('loginComponent')
    .controller('signInOptionsComponent', signInOptionsComponent);

  function signInOptionsComponent($rootScope, themeService, loginService, $state, $transition$, userService) {
    var vm = this;

    vm.loginUserHistory = getLoginHistory();

    vm.setUser = setUser;
    vm.goBack = goBack;

    $rootScope.$broadcast('loginHeaders', {
      subTitle: '',
      profileImage: ''
    });

    ////////////////////////////////

    function setUser(user) {
      if (user) {
        loginService.email = user.email;
        loginService.firstName = user.firstName;
        loginService.lastName = user.lastName;
        $rootScope.$broadcast('loginHeaders', {
          subTitle: 'Hello, ' + user.firstName,
          profileImage: user.profileImage
        });
        $state.go('login.password');
      } else {
        loginService.email = '';
        loginService.firstName = '';
        loginService.lastName = '';
        $rootScope.$broadcast('loginHeaders', {
          subTitle: '',
          profileImage: ''
        });
        $state.go('login.email');
      }
    }

    function getLoginHistory() {
      var data = loginService.getLoginHistory();

      if(data) {
        angular.forEach(data, function(value, key){
          data[key].profileImage = userService.getGravatar(value.email)
        });
      }

      return data;
    }

    function goBack() {
      $state.go($transition$.from().name || 'login.email');
    }
  }
  signInOptionsComponent.$inject = ['$rootScope', 'themeService', 'loginService', '$state', '$transition$', 'userService'];
})();
