(function(){
  'use strict';

  angular.module('dashboardApp')
    .config(iconConfig);

  function iconConfig($mdIconProvider) {
    var svgIcons = ['facebook', 'github-face', 'google-plus'],
      iconPath = '../images/icons/';

    for(var i = 0, len = svgIcons.length; i < len; i++) {
      $mdIconProvider.icon(svgIcons[i], iconPath + svgIcons[i] + '.svg');
    }
  }
  iconConfig.$inject = ['$mdIconProvider'];
})();
