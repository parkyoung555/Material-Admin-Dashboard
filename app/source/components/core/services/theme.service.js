(function(){
  'use strict';

  angular.module('coreComponent')
    .service('themeService', themeService);

  function themeService($mdColors, $mdColorUtil, $mdColorPalette, $mdTheming) {
    this.currentTheme = 'default';
    this.availableThemes = Object.keys($mdTheming.THEMES);
    this.darkMode = false;

    this.getTheme = getTheme;
    this.getThemePalette = getThemePalette;
    this.getThemeColor = getThemeColor;
    this.getColor = getColor;
    this.getRGBString = getRGBString;
    this.toggleDarkMode = toggleDarkMode;

    ////////////////////////////////////

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
      console.log($mdTheming.THEMES[this.currentTheme]);
      $mdTheming.THEMES[this.currentTheme].dark();
      getTheme(this.currentTheme).isDark = darkMode;
    }
  }
  themeService.$inject = ['$mdColors', '$mdColorUtil', '$mdColorPalette', '$mdTheming'];
})();
