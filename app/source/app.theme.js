(function(){
  'use strict';

  angular.module('dashboardApp')
    .config(themeConfig);

  function themeConfig($mdThemingProvider) {
    var themes = [
      {
        name: 'default',
        default: {
          primaryPalette: {
            color: 'grey',
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
        dark: {
          accentPalette: {
            color: 'blue',
            options: {
              'default': '400'
            }
          }
        }
      },
      {
        name: 'barelyBlue',
        default: {
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
        }
      },
      {
        name: 'reallyRed',
        default: {
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
        }
      },
      {
        name: 'prettyPurple',
        default: {
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
              'default': '500'
            }
          }
        },
        dark: {
          accentPalette: {
            color: 'teal',
            options: {
              'default': 'A100'
            }
          }
        }
      }
    ];

    for(var i = 0, len = themes.length; i < len; i++) {
      $mdThemingProvider.theme(themes[i].name)
        .primaryPalette(themes[i].default.primaryPalette.color, themes[i].default.primaryPalette.options)
        .accentPalette(themes[i].default.accentPalette.color, themes[i].default.accentPalette.options);

      if(themes[i].dark && themes[i].dark.primaryPalette) {
        $mdThemingProvider.theme(themes[i].name + 'Dark')
          .primaryPalette(
            themes[i].dark.primaryPalette.color,
            themes[i].dark.primaryPalette.options
          );
      }
      else {
        $mdThemingProvider.theme(themes[i].name + 'Dark')
          .primaryPalette(
            themes[i].default.primaryPalette.color,
            themes[i].default.primaryPalette.options
          );
      }

      if(themes[i].dark && themes[i].dark.accentPalette) {
        $mdThemingProvider.theme(themes[i].name + 'Dark')
          .accentPalette(
            themes[i].dark.accentPalette.color,
            themes[i].dark.accentPalette.options
          );
      }
      else {
        $mdThemingProvider.theme(themes[i].name + 'Dark')
          .accentPalette(
            themes[i].default.accentPalette.color,
            themes[i].default.accentPalette.options
          );
      }

      $mdThemingProvider.theme(themes[i].name + 'Dark').dark();
    }

    // $mdThemingProvider.alwaysWatchTheme(true);
    // $mdThemingProvider.generateThemesOnDemand(true);
    // $mdThemingProvider.setDefaultTheme('kindOfGrey');
  }
  themeConfig.$inject = ['$mdThemingProvider'];
})();
