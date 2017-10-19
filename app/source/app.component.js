(function(){
  'use strict';

  angular.module('dashboardApp')
    .controller('rootComponent', rootComponent);

  function rootComponent($rootScope, $scope, themeService) {
    var vm = this;

    vm.currentTheme = themeService.currentTheme;

    $scope.$watch(function(){
      return themeService.currentTheme;
    }, function(theme){
      vm.currentTheme = theme;
    });
  }
  rootComponent.$inject = ['$rootScope', '$scope', 'themeService'];
})();
