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

    $mdThemingProvider.theme('blue')
      .primaryPalette('blue', {
        'default': '500',
        'hue-1': '100',
        'hue-2': '600',
        'hue-3': '800'
      })
      .accentPalette('orange', {
        'default': 'A700'
      });

    // $mdThemingProvider.theme('red-dark')
    //   .primaryPalette('red', {
    //     'default': '500',
    //     'hue-1': '100',
    //     'hue-2': '600',
    //     'hue-3': '800'
    //   })
    //   .accentPalette('blue', {
    //     'default': 'A700'
    //   }).dark();
    //
    // $mdThemingProvider.theme('blue-dark')
    //   .primaryPalette('blue', {
    //     'default': '500',
    //     'hue-1': '100',
    //     'hue-2': '600',
    //     'hue-3': '800'
    //   })
    //   .accentPalette('orange', {
    //     'default': 'A400'
    //   }).dark();

    // $mdThemingProvider.generateThemesOnDemand(true);
    // $mdThemingProvider.setDefaultTheme('vanilla');
  }
  themeConfig.$inject = ['$mdThemingProvider'];
})();
