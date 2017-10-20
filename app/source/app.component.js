(function(){
  'use strict';

  angular.module('dashboardApp')
    .controller('rootComponent', rootComponent);

  function rootComponent($rootScope, $scope, themeService) {
    var vm = this;

    $scope.$watchCollection(function(){
      return [themeService.currentTheme, themeService.themeSuffix];
    }, function(theme){
      vm.currentTheme = theme[0] + theme[1];
      vm.darkMode = !!theme[1];
    });
  }
  rootComponent.$inject = ['$rootScope', '$scope', 'themeService'];
})();
