(function(){
  'use strict';

  angular.module('loginComponent')
    .service('loginService', loginService);

  function loginService() {
    this.email = '';
    this.password = '';
  }
  loginService.$inject = [];
})();
