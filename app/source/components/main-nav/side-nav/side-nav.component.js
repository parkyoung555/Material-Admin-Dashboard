(function(){
  'use strict';

  angular.module('mainNavComponent')
    .controller('sideNavComponent', sideNavComponent);

  function sideNavComponent($rootScope, $scope, $mdDialog, $mdMedia) {
    var vm = this;

    vm.openUserMenu = openUserMenu;
    vm.isCompact = !$mdMedia('gt-md');

    $rootScope.$on('isCompact', function(event, data){
        vm.isCompact = data;
    });

    ///////////////////////////

    function openUserMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    }
  }
  sideNavComponent.$inject = ['$rootScope', '$scope', '$mdDialog', '$mdMedia'];
})();
