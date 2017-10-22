(function () {
  'use strict';

  angular.module('widgetsComponent')
    .directive('widgetRenderer', widgetRenderer);

  function widgetRenderer($compile, $parse) {
    return {
      priority: 999,
      terminal: true,
      restrict: 'A',
      compile: function (element, attributes) {
        return function($scope, element, attributes) {
          var passedAttributes = $parse(attributes.widgetRenderer)($scope);

          if (passedAttributes !== null && passedAttributes !== undefined) {
            if (typeof passedAttributes === 'object') {
              for (var subKey in passedAttributes) {
                parseAttr(subKey, passedAttributes[subKey], attributes);
              }
            } else if (typeof passedAttributes === 'string') {
              parseAttr(passedAttributes, null, attributes);
            }
          }

          $compile(element, null, 999)($scope);
        };
      }
    };

    //////////////////////////////////

    function parseAttr(key, value, attributes) {
      function convertToDashes(match) {
        return match[0] + '-' + match[1].toLowerCase();
      }

      attributes.$set(key.replace(/([a-z][A-Z])/g, convertToDashes), value !== undefined && value !== null ? value : '');
    }
  }
  widgetRenderer.$inject = ['$compile', '$parse'];

})();
