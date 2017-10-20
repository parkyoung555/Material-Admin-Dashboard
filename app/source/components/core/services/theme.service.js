(function(){
  'use strict';

  angular.module('coreComponent')
    .service('themeService', themeService);

  function themeService($mdColors, $mdColorUtil, $mdColorPalette, $mdTheming, utilityService) {
    this.currentTheme = 'default';
    this.themeSuffix = '';
    this.availableThemes = getAvailableThemes();
    this.darkMode = false;

    this.getTheme = getTheme;
    this.getThemePalette = getThemePalette;
    this.getThemeColor = getThemeColor;
    this.getColor = getColor;
    this.getRGBString = getRGBString;
    this.toggleDarkMode = toggleDarkMode;

    ////////////////////////////////////

    function getAvailableThemes() {
      var availableThemes = [];
      angular.forEach($mdTheming.THEMES, function(theme, key){
        if(!theme.isDark) {
          availableThemes.push({
            label: utilityService.unCamelCase(key),
            value: key,
            color: getRGBString(getColor(key, 'primary', '500', 'value'))
          });
        }
      });
      return availableThemes;
    }

    function getTheme(themeName){
      return $mdTheming.THEMES[themeName];
    }

    function getThemePalette(themeName) {
      return $mdTheming.PALETTES[themeName];
    }

    function getThemeColor(expression) {
      return $mdColors.getThemeColor(expression);
    }

    function getColor(theme, type, hue, value) {
      var themeObject = getTheme(theme),
        colorPaletteName = themeObject.colors[type].name,
        colorPalette = getThemePalette(colorPaletteName);

      return colorPalette[hue][value];
    }

    function getRGBString(colorArray, a) {
      a = a || 1;
      return 'rgba(' + colorArray[0] + ', ' + colorArray[1] + ', ' + colorArray[2] + ', ' + a + ')';
    }

    function toggleDarkMode(darkMode) {
      this.themeSuffix = darkMode ? 'Dark' : '';
    }
  }
  themeService.$inject = ['$mdColors', '$mdColorUtil', '$mdColorPalette', '$mdTheming', 'utilityService'];
})();
