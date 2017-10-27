(function (){
  'use strict';

  angular.module('loginComponent')
    .run(loginRun);

  function loginRun($state, $transitions) {

    $transitions.onEnter({ entering: 'login.password' }, function(transition){
      var redirect = transition.injector().get('redirect');
      if(redirect) {
        return transition.router.stateService.target(redirect);
      }
    });
    $transitions.onError({}, function(transition){
      if (transition.error().detail === "AUTH_REQUIRED") {
        return $state.go('login.email');
      }
    });
  }
  loginRun.$inject = ['$state', '$transitions'];
})();
