(function(){
  'use strict';

  angular.module('coreComponent')
    .service('authService', loginService);

  function loginService($firebaseAuth, $state) {
    this.auth = $firebaseAuth();
    this.signOut = signOut;
    this.waitForSignIn = waitForSignIn;
    this.requireSignIn = requireSignIn;

    //////////////////////////////////

    function waitForSignIn() {
      return this.auth.$waitForSignIn();
    }

    function requireSignIn() {
      return this.auth.$requireSignIn();
    }

    function signOut() {
      this.auth.$signOut();
    }
  }
  loginService.$inject = ['$firebaseAuth', '$state'];
})();
