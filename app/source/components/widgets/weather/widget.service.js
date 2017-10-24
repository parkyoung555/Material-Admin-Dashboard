(function(){
  'use strict';

  angular.module('weatherWidgetComponent')
    .service('weatherWidgetService', weatherWidgetService);

  function weatherWidgetService($http, dummyData) {

    this.getWeatherData = getWeatherData;

    // YQL = Yahoo Query Language
    function getYQL(text) {
      var woeidQ = 'select woeid from geo.places(1) where text="'+text+'"';
      return 'select * from weather.forecast where woeid in ('+woeidQ+')';
    }

    // Example for text: vancouver, wa
    function getWeatherData(text) {
      return $http({
        method: 'GET',
        url: 'https://query.yahooapis.com/v1/public/yql',
        params: {
          q: getYQL(text),
          format: 'json'
        }
      });
    }

  }
    weatherWidgetService.$inject = ['$http', 'dummyData'];
})();
