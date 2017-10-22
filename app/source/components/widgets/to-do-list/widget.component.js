(function(){
  'use strict';

  angular.module('toDoListComponent')
    .controller('toDoListComponent', toDoListComponent);

  function toDoListComponent(toDoListService, $mdToast) {
    var vm = this;

    vm.tasks = toDoListService.getTasks();
    vm.addTask = addTask;
    vm.completeTask = completeTask;
    vm.removeTask = removeTask;
    vm.getActiveTasks = getActiveTasks;

    /////////////////////////////////

    function addTask(description) {
      toDoListService.addTask(description);
    }

    function completeTask(task) {
      if(!task.isCompleted) {
        var toast = $mdToast.simple()
          .hideDelay(6000)
          .highlightAction(true)
          .highlightClass('md-accent')
          .action('OK')
          .textContent('Task completed.');

        $mdToast.show(toast);
      }
      toDoListService.completeTask(task.id);
    }

    function getActiveTasks() {
      return vm.tasks.filter(function(task){
        return !task.isCompleted && !task.isDeleted;
      });
    }

    function removeTask(task) {
      toDoListService.removeTask(task.id);

      var toast = $mdToast.simple()
        .hideDelay(6000)
        .highlightAction(true)
        .highlightClass('md-accent')
        .textContent('Task deleted.')
        .action('UNDO');

      $mdToast.show(toast).then(function(response) {
        if ( response === 'ok' ) {
          task.isDeleted = false;
        }
      });
    }
  }
  toDoListComponent.$inject = ['toDoListService', '$mdToast'];
})();
