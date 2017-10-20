(function(){
  'use strict';

  angular.module('revenueWidgetComponent')
    .controller('revenueWidgetComponent', revenueWidgetComponent);

  function revenueWidgetComponent($scope, themeService, utilityService) {
    var vm = this,
      months = utilityService.getMonths();

    vm.widgetTheme = {
      primary: 700,
      accent: 'A400'
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

    $scope.$watch(function(){
      return themeService.currentTheme;
    }, function(theme){
      vm.currentTheme = theme;
      setChartColors(theme);
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
      var contrastColor = themeService.getColor(theme, 'primary', vm.widgetTheme.primary, 'contrast'),
        accentColor = themeService.getColor(theme, 'accent', vm.widgetTheme.accent, 'value');

      vm.chartConfig.plotOptions.area.fillColor = themeService.getRGBString(contrastColor, .24);
      vm.chartConfig.plotOptions.area.lineColor = themeService.getRGBString(accentColor);
      vm.chartConfig.plotOptions.area.marker.fillColor = themeService.getRGBString(accentColor);
      vm.chartConfig.plotOptions.area.states.hover.halo.attributes.fill = themeService.getRGBString(contrastColor, .12);
    }
  }
  revenueWidgetComponent.$inject = ['$scope', 'themeService', 'utilityService'];
})();
