(function (){
  'use strict';

  angular.module('dashboardApp')
    .run(appRun);

  function appRun($rootScope, $state, $transitions) {
    $rootScope.$state = $state;
    $transitions.onSuccess({}, function(){
      window.dispatchEvent(new Event('resize'));
    });
  }
  appRun.$inject = ['$rootScope', '$state', '$transitions'];
})();
