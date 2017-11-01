(function(){
  'use strict';

  angular.module('dashboardApp')
    .config(iconConfig);

  function iconConfig($mdIconProvider) {
    // Have to manually type base path for each asset or else it
    // will not be replaced with the revved filename during build sequence
    var svgIcons = [
        { name: 'facebook', src: '../images/icons/facebook.svg' },
        { name: 'github-face', src: '../images/icons/github-face.svg' },
        { name: 'google-plus', src: '../images/icons/google-plus.svg' }
      ];

    for(var i = 0, len = svgIcons.length; i < len; i++) {
      $mdIconProvider.icon(svgIcons[i].name, svgIcons[i].src);
    }
  }
  iconConfig.$inject = ['$mdIconProvider'];
})();
