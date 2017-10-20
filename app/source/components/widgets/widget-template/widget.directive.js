(function(){
  'use strict';

  angular.module('templateWidgetComponent')
    .directive('templateWidget', function(){
      return {
        restrict: 'EA',
        templateUrl: 'source/components/widgets/template-widget/widget.component.html',
        controller: 'templateWidgetComponent',
        controllerAs: 'templateWidgetVm',
        replace: true
      };
    });
})();
