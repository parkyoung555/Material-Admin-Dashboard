(function(){
  'use strict';

  angular.module('revenueWidgetComponent')
    .controller('revenueWidgetComponent', revenueWidgetComponent);

  function revenueWidgetComponent($scope, themeService, utilityService) {
    var vm = this,
      months = utilityService.getMonths();

    vm.widgetTheme = {
      default: {
        background: 'primary-700',
        area: {
          fill: ['primary', '700', 'contrast'],
          line: ['accent', '200', 'value']
        }
      }
    };
    vm.revenue = utilityService.randomIntFromInterval(1500000, 2500000);
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
          fillOpacity: 1,
          states: {
            hover: {
              lineWidth: 2,
              halo: {
                attributes: {
                  fill: 'rgba(41,98,255,.5)'
                },
                opacity: 1,
                size: 12
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
        pointFormat: '<div class="md-body-2">${point.y:,.2f}</div>'
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

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
      vm.darkTheme = !!theme[1];
      setChartColors(vm.currentTheme);
    });

    ////////////////////////////

    function generateData() {
      var data = [];
      for(var i = 0, len = new Date().getMonth() + 1; i < len; i++){
        data.push([months[i], utilityService.randomIntFromInterval(1500000, 2500000)]);
      }
      return data;
    }

    function setChartColors(theme) {
      var areaColor = themeService.getColor(theme, vm.widgetTheme.default.area.fill[0], vm.widgetTheme.default.area.fill[1], vm.widgetTheme.default.area.fill[2]),
        lineColor = themeService.getColor(theme, vm.widgetTheme.default.area.line[0], vm.widgetTheme.default.area.line[1], vm.widgetTheme.default.area.line[2]);

      vm.chartConfig.plotOptions.area.fillColor = themeService.getRGBString(areaColor, .24);
      vm.chartConfig.plotOptions.area.lineColor = themeService.getRGBString(lineColor);
      vm.chartConfig.plotOptions.area.marker.fillColor = themeService.getRGBString(lineColor);
      vm.chartConfig.plotOptions.area.states.hover.halo.attributes.fill = themeService.getRGBString(lineColor, .12);
    }
  }
  revenueWidgetComponent.$inject = ['$scope', 'themeService', 'utilityService'];
})();
