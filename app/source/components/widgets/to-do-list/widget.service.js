(function(){
  'use strict';

  angular.module('toDoListComponent')
    .service('toDoListService', toDoListService);

  function toDoListService() {
    var tasks = [
      {
        id: 0,
        description: 'Finish Dashboard for Presentation',
        date: new Date(new Date().getDate() - 6).getTime(),
        isCompleted: true,
        isDeleted: false
      },
      {
        id: 1,
        description: 'Feed doggos',
        date: new Date(new Date().getDate() - 3).getTime(),
        isCompleted: false,
        isDeleted: false
      },
      {
        id: 2,
        description: 'Tell Suchit to go home',
        date: new Date(new Date().getTime() - 25).getTime(),
        isCompleted: false,
        isDeleted: true
      },
      {
        id: 3,
        description: 'Email mean dude about memory sticks',
        date: new Date().getTime(),
        isCompleted: false,
        isDeleted: false
      }
    ];

    this.getTasks = getTasks;
    this.addTask = addTask;
    this.removeTask = removeTask;
    this.completeTask = completeTask;
    this.currentId = tasks.length - 1;

    /////////////////////////

    function getTasks() {
      return tasks;
    }

    function getTask(id) {
      for(var i = 0, len = tasks.length; i < len; i++) {
        if(tasks[i].id === id) {
          return tasks[i];
        }
      }
    }

    function addTask(description) {
      tasks.push({
        description: description,
        date: new Date().getTime()
      });
    }

    function removeTask(id) {
      getTask(id).isDeleted = true;
    }

    function completeTask(id) {
      getTask(id).isCompleted = !getTask(id).isCompleted;
    }
  }
  toDoListService.$inject = [];
})();
