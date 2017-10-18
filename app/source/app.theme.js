(function(){
  'use strict';

  angular.module('dashboardApp')
    .config(themeConfig);

  function themeConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('grey', {
        'default': '50',
        'hue-1': '100',
        'hue-2': '600',
        'hue-3': '800'
      })
      .accentPalette('blue', {
        'default': 'A400'
      });
  }
  themeConfig.$inject = ['$mdThemingProvider'];
})();
