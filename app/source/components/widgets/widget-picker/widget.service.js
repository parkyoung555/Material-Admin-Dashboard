(function(){
  'use strict';

  angular.module('widgetPickerComponent')
    .service('widgetPickerService', widgetPickerService);

  function widgetPickerService(utilityService) {
    var excludes = ['widgetPickerComponent'];
    this.getWidgetNames = getWidgetNames;

    ///////////////////////////

    function getWidgetNames() {
      var componentNames = angular.module('widgetsComponent').requires, d, directiveNames = [];
      componentNames = componentNames.filter(function(e){
        return this.indexOf(e) < 0;
      }, excludes);

      for(var i = 0, len1 = componentNames.length; i < len1; i++) {
        d = angular.module(componentNames[i])._invokeQueue;
        for(var j = 0, len2 = d.length; j < len2; ++j) {
          if(d[j][1] === "directive") {
            directiveNames.push(d[j][2][0]);
          }
        }
      }

      return directiveNames.map(function(e){
        return utilityService.camelToDash(e);
      });
    }
  }
  widgetPickerService.$inject = ['utilityService'];
})();
