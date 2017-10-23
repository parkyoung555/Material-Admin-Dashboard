(function(){
  'use strict';

  angular.module('toDoListComponent')
    .controller('addTaskDialogComponent', toDoListDialogComponent);

  function toDoListDialogComponent($mdDialog) {
    var vm = this;

    vm.closeDialog = closeDialog;
    vm.confirm = confirm;

    ///////////////////////////////

    function confirm() {
      if(vm.description && vm.deadline) {
        $mdDialog.hide({
          description: vm.description,
          deadline: vm.deadline
        });
      }
    }

    function closeDialog() {
      $mdDialog.cancel();
    }
  }
  toDoListDialogComponent.$inject = ['$mdDialog'];
})();
