(function(){
  'use strict';

  angular.module('salesPerformanceWidgetComponent')
    .directive('salesPerformance', function(){
      return {
        restrict: 'EA',
        templateUrl: 'source/components/widgets/sales-performance/widget.component.html',
        controller: 'salesPerformanceWidgetComponent',
        controllerAs: 'salesPerformanceWidgetVm',
        replace: true
      };
    });
})();
