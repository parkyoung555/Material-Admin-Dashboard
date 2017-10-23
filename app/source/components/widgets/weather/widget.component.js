(function(){
  'use strict';

  angular.module('weatherWidgetComponent')
    .controller('weatherComponent', weatherComponent);

  function weatherComponent($scope, themeService, weatherWidgetService) {
    var vm = this;

    vm.name = 'Weather Widget';
    vm.data = weatherWidgetService.getData();
    vm.city = vm.data.city;
    vm.weather = vm.data.list;

    vm.getIconUrl = getIconUrl;
    vm.getDate = getDate;

    function getDate(weather) {
      var t = new Date(weather.dt*1000),
          days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[t.getDay()];
    }

    function getIconUrl(weather) {
      return 'http://openweathermap.org/img/w/'+weather.icon+'.png';
    }
    console.log(vm.weather);
    console.log(vm.city);
  }
    weatherComponent.$inject = ['$scope', 'themeService', 'weatherWidgetService'];
})();
