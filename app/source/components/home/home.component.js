(function(){
  'use strict';

  angular.module('homeComponent')
    .controller('homeComponent', homeComponent);

  function homeComponent() {
    var vm = this;

    vm.activeWidgets = [
      {
        component: 'revenue'
      },
      {
        component: 'sales-performance'
      },
      {
        component: 'to-do-list'
      }
    ];
  }
  homeComponent.$inject = [];
})();
