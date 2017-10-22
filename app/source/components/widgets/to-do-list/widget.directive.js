(function(){
  'use strict';

  angular.module('toDoListComponent')
    .directive('toDoList', toDoList);

  function toDoList() {
    return {
      restrict: 'EA',
      templateUrl: 'source/components/widgets/to-do-list/widget.component.html',
      controller: 'toDoListComponent',
      controllerAs: 'toDoListVm',
      replace: true
    };
  }
  toDoList.$inject = [];
})();
