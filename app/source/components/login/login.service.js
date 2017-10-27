(function(){
  'use strict';

  angular.module('loginComponent')
    .service('loginService', loginService);

  function loginService() {
    this.cacheKey = 'userData';
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';

    this.getLoginHistory = getLoginHistory;
    this.setLoginHistory = setLoginHistory;

    ////////////////////////////////////

    function getLoginHistory() {
      return JSON.parse(localStorage.getItem(this.cacheKey));
    }

    function setLoginHistory(data) {
      var currentData = this.getLoginHistory() || {};

      currentData[SparkMD5.hash(data.email)] = data;
      localStorage.setItem(this.cacheKey, JSON.stringify(currentData));
    }
  }
  loginService.$inject = [];
})();
