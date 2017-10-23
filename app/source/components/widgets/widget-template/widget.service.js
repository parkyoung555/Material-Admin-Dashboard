(function(){
  'use strict';

  angular.module('templateWidgetComponent')
    .service('templateWidgetService', templateWidgetService);

  function templateWidgetService($http) {

  }
  templateWidgetService.$inject = ['$http'];
})();
