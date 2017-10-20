(function(){
  'use strict';

  angular.module('settingsComponent')
    .controller('settingsComponent', settingsComponent);

  function settingsComponent(themeService) {
    var vm = this;

    vm.themes = themeService.availableThemes;
    vm.enableDarkMode = themeService.darkMode;
    vm.currentTheme = themeService.currentTheme;

    vm.changeTheme = changeTheme;
    vm.toggleDarkMode = toggleDarkMode;

    //////////////////////////////////

    function changeTheme(theme) {
      vm.currentTheme = themeService.setCurrentTheme(theme);
    }

    function toggleDarkMode() {
      themeService.toggleDarkMode(vm.enableDarkMode);
    }
  }
  settingsComponent.$inject = ['themeService'];
})();
