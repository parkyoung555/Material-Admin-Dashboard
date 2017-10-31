(function(){
  'use strict';

  angular.module('coreComponent')
    .service('authService', authService);

  function authService($firebaseAuth, $state) {
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
      return this.auth.$signOut();
    }
  }
  authService.$inject = ['$firebaseAuth', '$state'];
})();
