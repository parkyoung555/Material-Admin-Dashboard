(function(){
  'use strict';

  angular.module('dashboardApp')
    .config(themeConfig);

  function themeConfig($mdThemingProvider) {
    var themes = [
      {
        name: 'default',
        primaryPalette: {
          color: 'grey',
          options: {
            'default': '50',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': '800'
          }
        },
        accentPalette: {
          color: 'blue',
          options: {
            'default': 'A400'
          }
        }
      },
      {
        name: 'barelyBlue',
        primaryPalette: {
          color: 'blue',
          options: {
            'default': '500',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': '800'
          }
        },
        accentPalette: {
          color: 'orange',
          options: {
            'default': 'A700'
          }
        }
      },
      {
        name: 'reallyRed',
        primaryPalette: {
          color: 'red',
          options: {
            'default': '500',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': '800'
          }
        },
        accentPalette: {
          color: 'blue',
          options: {
            'default': '500'
          }
        }
      },
      {
        name: 'prettyPurple',
        primaryPalette: {
          color: 'purple',
          options: {
            'default': '500',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': '800'
          }
        },
        accentPalette: {
          color: 'teal',
          options: {
            'default': 'A100'
          }
        }
      }
    ];

    for(var i = 0, len = themes.length; i < len; i++) {
      $mdThemingProvider.theme(themes[i].name)
        .primaryPalette(themes[i].primaryPalette.color, themes[i].primaryPalette.options)
        .accentPalette(themes[i].accentPalette.color, themes[i].accentPalette.options);

      $mdThemingProvider.theme(themes[i].name + 'Dark')
        .primaryPalette(themes[i].primaryPalette.color, themes[i].primaryPalette.options)
        .accentPalette(themes[i].accentPalette.color, themes[i].accentPalette.options)
        .dark();
    }

    $mdThemingProvider.alwaysWatchTheme(true);
    // $mdThemingProvider.generateThemesOnDemand(true);
    // $mdThemingProvider.setDefaultTheme('kindOfGrey');
  }
  themeConfig.$inject = ['$mdThemingProvider'];
})();
