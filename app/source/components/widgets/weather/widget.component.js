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

      // Image asset paths must be hard coded since file revver will not be able to recognize dynamically built paths
      switch (weatherCode) {
        case 25: // cold
        case 32: // sunny
        case 33: // fair (night)
        case 34: // fair (day)
        case 36: // hot
        case 3200: // not available
          return '/images/md-weather-iconset/weather-clear.png';
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
          return '/images/md-weather-iconset/weather-rain.png';
        case 3: // severe thunderstorms
        case 4: // thunderstorms
        case 37: // isolated thunderstorms
        case 38: // scattered thunderstorms
        case 39: // scattered thunderstorms (not a typo)
        case 45: // thundershowers
        case 47: // isolated thundershowers
          return '/images/md-weather-iconset/weather-storm.png';
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
          return '/images/md-weather-iconset/weather-snow.png';
        case 15: // blowing snow
        case 19: // dust
        case 20: // foggy
        case 21: // haze
        case 22: // smoky
          return '/images/md-weather-iconset/weather-fog.png';
        case 24: // windy
        case 23: // blustery
          return '/images/md-weather-iconset/weather-wind.png';
        case 26: // cloudy
        case 27: // mostly cloudy (night)
        case 28: // mostly cloudy (day)
        case 31: // clear (night)
          return '/images/md-weather-iconset/weather-clouds.png';
        case 29: // partly cloudy (night)
        case 30: // partly cloudy (day)
        case 44: // partly cloudy
          return '/images/md-weather-iconset/weather-few-clouds.png';
      }
    }

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
    });

    ////////////////////////////////

    function getIconUrl(code) {
      return getIconClass(code);
    }

    function getTimestamp(dateStr) {
      var d = new Date(dateStr);
      return d.getTime();
    }
  }
    weatherComponent.$inject = ['$scope', 'themeService', 'weatherWidgetService'];
})();
