(function(){
  'use strict';

  angular.module('revenueWidgetComponent')
    .directive('revenue', revenue);

  function revenue() {
    return {
      restrict: 'EA',
      templateUrl: 'source/components/widgets/revenue/widget.component.html',
      controller: 'revenueWidgetComponent',
      controllerAs: 'revenueWidgetVm',
      replace: true
    };
  }
  revenue.$inject = [];
})();
