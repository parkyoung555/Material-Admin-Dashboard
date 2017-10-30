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
    this.setCurrentTheme = setCurrentTheme;
    this.toggleDarkMode = toggleDarkMode;
    this.mdColorsAttrValue = mdColorsAttrValue;

    ////////////////////////////////////

    function getAvailableThemes() {
      var availableThemes = [];
      angular.forEach($mdTheming.THEMES, function(theme, key){
        if(!theme.isDark) {
          availableThemes.push({
            label: utilityService.unCamelCase(key),
            value: key,
            color: getRGBString(getColor(key, 'primary', '500', 'value')),
            contrastColor: getRGBString(getColor(key, 'primary', '500', 'contrast'))
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
      var alpha = typeof a === 'number' ? a : (typeof colorArray[3] === 'number' ? colorArray[3] : 1);
      return 'rgba(' + colorArray[0] + ', ' + colorArray[1] + ', ' + colorArray[2] + ', ' + alpha + ')';
    }

    function setCurrentTheme(themeName) {
      this.currentTheme = themeName;
      return themeName;
    }

    function toggleDarkMode(darkMode) {
      this.darkMode = darkMode;
      this.themeSuffix = darkMode ? 'Dark' : '';
    }

    function mdColorsAttrValue(isEnabled, cssProperty, paletteName) {
      return isEnabled ? '{' + cssProperty + ': \'' + paletteName + '\'}' : '';
    }
  }
  themeService.$inject = ['$mdColors', '$mdColorUtil', '$mdColorPalette', '$mdTheming', 'utilityService'];
})();
