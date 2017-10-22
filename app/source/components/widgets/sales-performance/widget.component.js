(function(){
  'use strict';

  angular.module('salesPerformanceWidgetComponent')
    .controller('salesPerformanceWidgetComponent', salesPerformanceWidgetComponent);

  function salesPerformanceWidgetComponent($scope, themeService, utilityService, $mdMenu) {
    var vm = this,
      dateRanges = [10, 20, 30],
      chartData = generateData();

    vm.widgetTheme = {
      spline: ['primary', 500],
      bar: [
        ['accent', 'A100'],
        ['accent', 'A200'],
        ['accent', 'A700']
      ]
    };
    vm.dateRanges = dateRanges;
    vm.activeDateRange = dateRanges[dateRanges.length - 1];
    vm.stats = getStats(chartData);
    vm.openDateRangeMenu = openDateRangeMenu;
    vm.updateDateRange = updateDateRange;

    vm.chartConfig = {
      chart: {
        type: 'area',
        backgroundColor:'rgba(255, 255, 255, 0.0)',
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        height: 304,
        style: {
          fontFamily: 'Roboto'
        }
      },
      plotOptions: {
        area: {
          lineWidth: 0,
          lineColor: '#448AFF',
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, 'rgba(255,255,255,.24)'],
              [1, 'rgba(255,255,255,0)']
            ]
          },
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
        pointFormat: '<div class="md-body-2">${point.y:,.2f}</div>',
        xDateFormat: '%a %B %e, %Y'
      },
      xAxis: {
        minPadding: 0,
        maxPadding: 0,
        gridLineWidth: 1,
        labels: {
          align: 'right',
          x: -4,
          y: -4,
          style: {}
        },
        type: 'datetime',
        opposite: true,
        tickPositioner: function (min, max) {
          var ticks = this.series[0].processedXData.slice(); // get point positions copy
          ticks.info = this.tickPositions.info;              // copy format for labels
          return ticks;                                      // return new ticks
        },
        gridLineDashStyle: 'Dot',
        crosshair: {}
      },
      yAxis: {
        // visible: false,
        minPadding: 0,
        maxPadding: 0,
        labels: {
          align: 'left',
          x: 4,
          y: -4,
          formatter: function(){
            if(!this.isFirst && !this.isLast){
              if(this.value > 1000) {
                return (this.value / 1000).toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumSignificantDigits: 1 }) + 'K';
              } else {
                return this.value.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumSignificantDigits: 1 }) + 'K';
              }
            }
          },
          style: {}
        },
        title: {
          text: ''
        },
        gridLineDashStyle: 'Dot',
        crosshair: {}
      },
      series: [
        {
          name: 'Sales Performance',
          type: 'area',
          data: chartData.slice(chartData.length - dateRanges[dateRanges.length - 1], chartData.length)
        }
      ],
      credits: {
        enabled: false
      },
      func: function(chart) {
        console.log(chart);
      }
    };

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
      vm.darkTheme = !!theme[1];
      setChartColors(vm.currentTheme);
    });

    /////////////////////////

    function openDateRangeMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    }

    function generateData() {
      var data = [],
        daysAgo = 100,
        date = new Date().setHours(0,0,0,0),
        startDate = date - (1000 * 60 * 60 * 24 * daysAgo);

      for(var i = 0; i < daysAgo; i++){
        data.push([startDate, utilityService.randomIntFromInterval(10000, 20000, 2)]);
        startDate += (1000 * 60 * 60 * 24);
      }
      return data;
    }

    function updateDateRange() {
      vm.chartConfig.series[0].data = chartData.slice(chartData.length - vm.activeDateRange, chartData.length);
    }

    function getStats(data) {
      var total = 0,
        allTimeHigh = 0;
      for(var i = 0, len = data.length; i < len; i++) {
        total += data[i][1];
        if(data[i][1] > allTimeHigh) {
          allTimeHigh = data[i][1];
        }
      }

      return [
        {
          label: 'Average',
          value: total / data.length
        },
        {
          label: 'All Time High',
          value: allTimeHigh
        },
        {
          label: 'Total',
          value: total
        }
      ];
    }

    function setChartColors(theme) {
      var splineColor = !vm.darkTheme ? themeService.getColor(theme, vm.widgetTheme.spline[0], vm.widgetTheme.spline[1], 'value') :
        themeService.getThemePalette('grey')['100'].value,
        accent100Color = themeService.getColor(theme, vm.widgetTheme.bar[0][0], vm.widgetTheme.bar[0][1], 'value'),
        accent200Color = themeService.getColor(theme, vm.widgetTheme.bar[1][0], vm.widgetTheme.bar[1][1], 'value'),
        accent700Color = themeService.getColor(theme, vm.widgetTheme.bar[2][0], vm.widgetTheme.bar[2][1], 'value'),
        lineColor = !vm.darkTheme ? [0,0,0,.12] : [255,255,255,.12],
        fontColor = !vm.darkTheme ? [0,0,0,.24] : [255,255,255,.24];

      // // Spline colors
      // vm.chartConfig.plotOptions.spline.lineColor = themeService.getRGBString(splineColor);
      // vm.chartConfig.plotOptions.spline.marker.fillColor = themeService.getRGBString(splineColor);
      // vm.chartConfig.plotOptions.spline.marker.lineColor = themeService.getRGBString(splineColor);
      // vm.chartConfig.plotOptions.spline.states.hover.halo.attributes.fill = themeService.getRGBString(splineColor, .12);
      //
      // // Bar colors
      // vm.chartConfig.series[0].color = themeService.getRGBString(accent100Color);
      // vm.chartConfig.series[1].color = themeService.getRGBString(accent200Color);
      // vm.chartConfig.series[2].color = themeService.getRGBString(accent700Color);

      // Spline colors
      vm.chartConfig.plotOptions.area.lineColor = themeService.getRGBString(accent200Color);
      vm.chartConfig.plotOptions.area.marker.fillColor = themeService.getRGBString(accent200Color);
      vm.chartConfig.plotOptions.area.marker.lineColor = themeService.getRGBString(accent200Color);
      vm.chartConfig.plotOptions.area.states.hover.halo.attributes.fill = themeService.getRGBString(accent200Color, .12);

      // Area color
      if(vm.darkTheme) {
        vm.chartConfig.plotOptions.area.fillColor.stops[0][1] = themeService.getRGBString([255,255,255,.3]);
        vm.chartConfig.plotOptions.area.fillColor.stops[1][1] = themeService.getRGBString(accent100Color, .2);
      } else {
        vm.chartConfig.plotOptions.area.fillColor.stops[0][1] = themeService.getRGBString(accent200Color, .5);
        vm.chartConfig.plotOptions.area.fillColor.stops[1][1] = themeService.getRGBString([255,255,255,.2]);
      }

      // Grid line colors
      vm.chartConfig.xAxis.lineColor = themeService.getRGBString(lineColor, .06);
      vm.chartConfig.xAxis.gridLineColor = themeService.getRGBString(lineColor);
      vm.chartConfig.xAxis.tickColor = themeService.getRGBString(lineColor, .06);
      vm.chartConfig.yAxis.lineColor = themeService.getRGBString(lineColor);
      vm.chartConfig.yAxis.gridLineColor = themeService.getRGBString(lineColor);

      // Crosshair Color
      vm.chartConfig.xAxis.crosshair.color = themeService.getRGBString(lineColor,.08);
      vm.chartConfig.yAxis.crosshair.color = themeService.getRGBString(lineColor);

      // Text colors
      vm.chartConfig.xAxis.labels.style.color = themeService.getRGBString(fontColor);
      vm.chartConfig.yAxis.labels.style.color = themeService.getRGBString(fontColor);
    }
  }
  salesPerformanceWidgetComponent.$inject = ['$scope', 'themeService', 'utilityService', '$mdMenu'];
})();
