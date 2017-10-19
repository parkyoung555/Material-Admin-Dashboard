(function(){
  'use strict';

  angular.module('revenueWidgetComponent')
    .controller('revenueWidgetComponent', revenueWidgetComponent);

  function revenueWidgetComponent() {
    var vm = this;
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    Highcharts.setOptions({
      lang: {
        decimalPoint: '.',
        thousandsSep: ','
      }
    });

    vm.revenue = 3672833773;
    vm.trendPercent = 80;
    vm.chartConfig = {
      chart: {
        type: 'area',
        backgroundColor:'rgba(255, 255, 255, 0.0)',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        height: 104,
        style: {
          fontFamily: 'Roboto'
        }
      },
      plotOptions: {
        area: {
          lineWidth: 0,
          lineColor: '#448AFF',
          fillColor: 'rgba(41,98,255,.3)',
          fillOpacity: .5,
          states: {
            hover: {
              lineWidth: 2,
              halo: {
                attributes: {
                  fill: 'rgba(41,98,255,.5)'
                }
              }
            }
          },
          marker: {
            enabled: false,
            fillColor: '#448AFF',
            states: {
              hover: {
                lineWidth: 0
              }
            }
          }
        }
      },
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<div class="md-caption">{point.key}</div><br />',
        pointFormat: '<div class="md-body-2">${point.y:,.2f}</div>',
        backgroundColor: '#fff',
        borderRadius: 2,
        borderWidth: 0
      },
      xAxis: {
        visible: false,
        minPadding: 0,
        maxPadding: 0
      },
      yAxis: {
        visible: false,
        minPadding: 0,
        maxPadding: 0
      },
      series: [
        {
          name: 'Revenue',
          data: generateData()
        }
      ],
      credits: {
        enabled: false
      }
    };

    ////////////////////////////

    function generateData() {
      var data = [];
      for(var i = 0, len = new Date().getMonth() + 1; i < len; i++){
        data.push([months[i], randomIntFromInterval(1500000, 2500000)]);
      }
      return data;
    }

    function randomIntFromInterval(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    }
  }
  revenueWidgetComponent.$inject = [];
})();
