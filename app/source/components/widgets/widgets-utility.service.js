(function(){
  'use strict';

  angular.module('widgetsComponent')
    .service('widgetsUtilityService', widgetsUtilityService);

  function widgetsUtilityService($timeout) {
    this.reflowHighcharts = reflowHighcharts;

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
