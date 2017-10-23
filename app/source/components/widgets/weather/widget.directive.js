(function(){
  'use strict';

  angular.module('weatherWidgetComponent')
    .directive('weather', function(){
      return {
        restrict: 'EA',
        templateUrl: 'source/components/widgets/weather/widget.component.html',
        controller: 'weatherComponent',
        controllerAs: 'weatherVm',
        replace: true
      };
    });
})();
