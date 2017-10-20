(function(){
  'use strict';

  angular.module('salesPerformanceWidgetComponent')
    .controller('salesPerformanceWidgetComponent', salesPerformanceWidgetComponent);

  function salesPerformanceWidgetComponent($scope, themeService, utilityService) {
    var vm = this,
      chartData = generateData();

    vm.chartConfig = {
      chart: {
        backgroundColor:'rgba(255, 255, 255, 0.0)',
        spacingBottom: 16,
        spacingTop: 16,
        spacingLeft: 16,
        spacingRight: 16,
        height: 304,
        style: {
          fontFamily: 'Roboto'
        }
      },
      plotOptions: {
        column: {
          borderRadius: 2,
          borderWidth: 0
        },
        pie: {
          borderWidth: 0
        },
        series: {
          pointWidth: null,
          maxPointWidth: 64
        }
      },
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      xAxis: {
        categories: chartData.months
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          formatter: function(){
            return '$' + (this.value / 1000) + 'K'
          }
        },
        minPadding: 0,
        maxPadding: 0
      },
      series: [{
        type: 'column',
        name: 'Low',
        data: chartData.low
      }, {
        type: 'column',
        name: 'Median',
        data: chartData.median
      }, {
        type: 'column',
        name: 'High',
        data: chartData.high
      }, {
        type: 'spline',
        name: 'Average',
        data: chartData.average,
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3]
        }
      }, {
        type: 'pie',
        name: 'Sales Commodities',
        data: [{
          name: 'Processors',
          y: 13,
          color: Highcharts.getOptions().colors[0]
        }, {
          name: 'Memory',
          y: 23,
          color: Highcharts.getOptions().colors[1]
        }, {
          name: 'CPUs',
          y: 19,
          color: Highcharts.getOptions().colors[2]
        }],
        center: [64, 48],
        size: 100,
        showInLegend: false,
        dataLabels: {
          enabled: false
        },
        tooltip: {
          headerFormat: '<div class="md-caption">{point.key}</div><br />',
          pointFormat: '<div class="md-body-2">{point.y:,.1f}%</div>'
        }
      }],
      legend: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<div class="md-caption">{point.key}</div><br />',
        pointFormat: '<div class="md-body-2">${point.y:,.2f}</div>'
      },
      credits: {
        enabled: false
      }
    };

    function generateData() {
      var data = {
        low: [],
        median: [],
        high: [],
        average: [],
        months: []
      }, low, median, high,
      months = utilityService.getMonths();
      for(var i = 0, len = new Date().getMonth() + 1; i < len; i++){
        low = utilityService.randomIntFromInterval(150000, 2500000);
        median = utilityService.randomIntFromInterval(low, low + 1000000);
        high = utilityService.randomIntFromInterval(median, median + 1000000);
        data.low.push(low);
        data.median.push(median);
        data.high.push(high);
        data.average.push((low + median + high) / 3);
        data.months.push(months[i]);
      }
      return data;
    }
  }
  salesPerformanceWidgetComponent.$inject = ['$scope', 'themeService', 'utilityService'];
})();
