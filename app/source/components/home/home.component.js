(function(){
  'use strict';

  angular.module('homeComponent')
    .controller('homeComponent', homeComponent);

  function homeComponent() {
    var vm = this;

    vm.fluidGridOptions = {
      columns: 8, // the width of the grid, in columns
      pushing: true, // whether to push other items out of the way on move or resize
      floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
      margins: [0, 0],
      minRow: 1,
      width:'auto',
      maxRows: 1000,
      rowHeight: (112 / 2) + 8,
      draggable: {
        enabled: true
      },
      dynamicContent: {
        name: 'component',
        selector: '.widget-component'
      },
      resizable: {
        enabled: true,
        start: function(event, $element, item) {

        }, // optional callback fired when resize is started,
        resize: function(event, $element, item) {

        }, // optional callback fired when item is resized,
        stop: function(event, $element, item) {

        } // optional callback fired when item is finished resizing
      }
    };
    vm.activeWidgets = [
      {
        sizeX: 2, sizeY: 2,
        component: 'revenue'
      },
      {
        sizeX: 2, sizeY: 2,
        component: 'revenue'
      },
      {
        sizeX: 2, sizeY: 2,
        component: 'revenue'
      },
      {
        sizeX: 2, sizeY: 2,
        component: 'revenue'
      },
      {
        sizeX: 8, sizeY: 7,
        component: 'sales-performance'
      },
      {
        sizeX: 4, sizeY: 8,
        component: 'to-do-list'
      }
    ];
  }
  homeComponent.$inject = [];
})();
