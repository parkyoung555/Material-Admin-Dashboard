(function(){
  'use strict';

  angular.module('widgetsComponent')
    .service('widgetsUtilityService', widgetsUtilityService);

  function widgetsUtilityService($timeout) {
    this.reflowHighcharts = reflowHighcharts;
    this.defaultSizes = {
      'revenue': [2, 2],
      'sales-performance': [8, 7],
      'weather': [3,6],
      'to-do-list': [4, 8],
      'calender': [4, 8]
    };

    //////////////////////////

    function reflowHighcharts() {
      var charts = Highcharts.charts;
      if(charts && charts.length) {
        $timeout(function(){
          for (var i = 0, len = charts.length; i < len; i++) {
            if(charts[i]) {
              charts[i].reflow();
            }
          }
        }, 500); // Unfortunately this timeout is necessary.
      }
    }
  }
  widgetsUtilityService.$inject = ['$timeout'];
})();
