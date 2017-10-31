(function(){
  'use strict';

  angular.module('weatherWidgetComponent')
    .controller('weatherComponent', weatherComponent);

  function weatherComponent($scope, themeService, weatherWidgetService) {
    var vm = this;

    vm.weather = {};
    vm.forecast = [];
    vm.daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    vm.locationText = 'Houston, TX';

    vm.getIconClass = getIconClass;
    vm.getIconUrl = getIconUrl;
    vm.getTimestamp = getTimestamp;

    weatherWidgetService.getWeatherData(vm.locationText).then(function(res) {
      vm.weather = res.data.query.results.channel;
      vm.forecast = vm.weather.item.forecast.slice(1, 7);
    });

    function getIconClass (weatherCode) {
      // Weather codes: https://developer.yahoo.com/weather/documentation.html#codes
      weatherCode = parseInt(weatherCode);
      switch (weatherCode) {
        case 25: // cold
        case 32: // sunny
        case 33: // fair (night)
        case 34: // fair (day)
        case 36: // hot
        case 3200: // not available
          return 'clear';
        case 0: // tornado
        case 1: // tropical storm
        case 2: // hurricane
        case 6: // mixed rain and sleet
        case 8: // freezing drizzle
        case 9: // drizzle
        case 10: // freezing rain
        case 11: // showers
        case 12: // showers
        case 17: // hail
        case 35: // mixed rain and hail
        case 40: // scattered showers
          return 'rain';
        case 3: // severe thunderstorms
        case 4: // thunderstorms
        case 37: // isolated thunderstorms
        case 38: // scattered thunderstorms
        case 39: // scattered thunderstorms (not a typo)
        case 45: // thundershowers
        case 47: // isolated thundershowers
          return 'storm';
        case 5: // mixed rain and snow
        case 7: // mixed snow and sleet
        case 13: // snow flurries
        case 14: // light snow showers
        case 16: // snow
        case 18: // sleet
        case 41: // heavy snow
        case 42: // scattered snow showers
        case 43: // heavy snow
        case 46: // snow showers
          return 'snow';
        case 15: // blowing snow
        case 19: // dust
        case 20: // foggy
        case 21: // haze
        case 22: // smoky
          return 'fog';
        case 24: // windy
        case 23: // blustery
          return 'wind';
        case 26: // cloudy
        case 27: // mostly cloudy (night)
        case 28: // mostly cloudy (day)
        case 31: // clear (night)
          return 'clouds';
        case 29: // partly cloudy (night)
        case 30: // partly cloudy (day)
        case 44: // partly cloudy
          return 'few-clouds';
      }
    }

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
    });

    ////////////////////////////////

    function getIconUrl(code) {
      var file = getIconClass(code);
      return '/images/md-weather-iconset/weather-'+file+'.png';
    }

    function getTimestamp(dateStr) {
      var d = new Date(dateStr);
      return d.getTime();
    }
  }
    weatherComponent.$inject = ['$scope', 'themeService', 'weatherWidgetService'];
})();
