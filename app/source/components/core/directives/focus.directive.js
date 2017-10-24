(function(){
  'use strict';

  angular.module('coreComponent')
    .directive('focusOn', focusOn);

  function focusOn($timeout) {
    return {
      scope: { trigger: '=focusOn' },
      link: function(scope, element) {
        scope.$watch('trigger', function(value) {
          if((value) === true) {
            $timeout(function() {
              element[0].focus();
              scope.trigger = false;
            }, 200);
          }
        });
      }
    };
  }
  focusOn.$inject = ['$timeout'];
})();
