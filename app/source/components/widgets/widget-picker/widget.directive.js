(function(){
  'use strict';

  angular.module('widgetPickerComponent')
    .directive('widgetPicker', function(){
      return {
        restrict: 'EA',
        templateUrl: 'source/components/widgets/widget-picker/widget.component.html',
        controller: 'widgetPickerComponent',
        controllerAs: 'widgetPickerVm',
        replace: true
      };
    });
})();
