(function(){
  'use strict';

  angular.module('toDoListComponent')
    .controller('toDoListComponent', toDoListComponent);

  function toDoListComponent(toDoListService, $mdToast, $mdDialog) {
    var vm = this,
      toast = $mdToast.simple()
      .hideDelay(6000)
      .highlightAction(true)
      .highlightClass('md-accent');

    vm.tasks = toDoListService.getTasks();
    vm.addTask = addTask;
    vm.completeTask = completeTask;
    vm.removeTask = removeTask;
    vm.getActiveTasks = getActiveTasks;

    /////////////////////////////////

    function addTask(ev) {
      $mdDialog.show({
        controller: 'addTaskDialogComponent',
        controllerAs: 'addTaskDialogVm',
        templateUrl: 'source/components/widgets/to-do-list/add-task-dialog/add-task.component.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: false
      }).then(function(taskData) {
        toDoListService.addTask(taskData);
        toast
          .textContent('Task added.')
          .action('OK');

        $mdToast.show(toast);
      });
    }

    function completeTask(task) {
      if(!task.isCompleted) {
        toast
          .action('OK')
          .textContent('Task completed.');

        $mdToast.show(toast);
      }
      toDoListService.completeTask(task.id);
    }

    function getActiveTasks() {
      return vm.tasks.filter(function(task){
        return !task.isDeleted;
      });
    }

    function removeTask(task) {
      toDoListService.removeTask(task.id);

      toast
        .textContent('Task deleted.')
        .action('UNDO');

      $mdToast.show(toast).then(function(response) {
        if ( response === 'ok' ) {
          task.isDeleted = false;
        }
      });
    }
  }
  toDoListComponent.$inject = ['toDoListService', '$mdToast', '$mdDialog'];
})();
