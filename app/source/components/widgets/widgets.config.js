(function(){
  'use strict';

  angular.module('widgetsComponent')
    .config(widgetsConfig);

  function widgetsConfig(){
    Highcharts.setOptions({
      lang: {
        decimalPoint: '.',
        thousandsSep: ','
      },
      tooltip: {
        backgroundColor: '#fff',
        borderRadius: 2,
        borderWidth: 0
      }
    });
  }
})();
