(function (){
  'use strict';

  angular.module('dashboardApp')
    .run(appRun);

  function appRun($rootScope, $state, $transitions) {
    $rootScope.$state = $state;
    $transitions.onFinish({}, function(){
      // window.dispatchEvent(new Event('resize'));
    });
  }
  appRun.$inject = ['$rootScope', '$state', '$transitions'];
})();
