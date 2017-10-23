(function(){
  'use strict';

  angular.module('weatherWidgetComponent')
    .service('weatherWidgetService', weatherWidgetService);

  function weatherWidgetService($http, dummyData) {
    this.getData = getData;

    function getData() {
      return dummyData;
    }
  }
    weatherWidgetService.$inject = ['$http', 'dummyData'];
})();
