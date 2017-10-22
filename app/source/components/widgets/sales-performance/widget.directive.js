(function(){
  'use strict';

  angular.module('salesPerformanceWidgetComponent')
    .directive('salesPerformance', salesPerformance);

  function salesPerformance() {
    return {
      restrict: 'EA',
      templateUrl: 'source/components/widgets/sales-performance/widget.component.html',
      controller: 'salesPerformanceWidgetComponent',
      controllerAs: 'salesPerformanceWidgetVm',
      replace: true
    };
  }
  salesPerformance.$inject = [];
})();
