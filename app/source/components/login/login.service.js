(function(){
  'use strict';

  angular.module('loginComponent')
    .service('loginService', loginService);

  function loginService($state, authService) {
    this.cacheKey = 'userData';
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';

    this.getLoginHistory = getLoginHistory;
    this.setLoginHistory = setLoginHistory;
    this.login = login;
    this.logout = logout;

    ////////////////////////////////////

    function getLoginHistory() {
      return JSON.parse(localStorage.getItem(this.cacheKey));
    }

    function setLoginHistory(data) {
      var currentData = this.getLoginHistory() || {};

      currentData[SparkMD5.hash(data.email)] = data;
      localStorage.setItem(this.cacheKey, JSON.stringify(currentData));
    }

    function login() {
      $state.go('root.home');
    }

    function logout() {
      authService.signOut()
        .then(function(){
          $state.go('login.email');
        })
        .catch(function(){
          console.error('Could not sign out for some reason...');
        });
    }
  }
  loginService.$inject = ['$state', 'authService'];
})();
