(function(){
  'use strict';

  angular.module('widgetsComponent')
    .config(widgetsConfig);

  function widgetsConfig(){
    Highcharts.setOptions({
      lang: {
        decimalPoint: '.',
        thousandsSep: ','
      }
    });
  }
})();
