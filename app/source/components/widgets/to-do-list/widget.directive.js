(function(){
  'use strict';

  angular.module('toDoListComponent')
    .directive('toDoList', function(){
      return {
        restrict: 'EA',
        templateUrl: 'source/components/widgets/to-do-list/widget.component.html',
        controller: 'toDoListComponent',
        controllerAs: 'toDoListVm',
        replace: true
      };
    });
})();
