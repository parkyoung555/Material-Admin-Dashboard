(function(){
  'use strict';

  angular.module('mainNavComponent')
    .controller('topNavComponent', topNavComponent);

  function topNavComponent($rootScope, $scope, $mdMedia, $mdSidenav) {
    var vm = this;
    vm.isCompact = !$mdMedia('gt-md');
    vm.toggleCompactMenu = toggleCompactMenu;

    $scope.$watch(function(){
      return $mdMedia('gt-md');
    }, function(md){
      vm.isCompact = !md;
      $rootScope.$broadcast('isCompact', vm.isCompact);
    });

    ////////////////////////////////

    function toggleCompactMenu() {
      if($mdMedia('gt-md')) {
        vm.isCompact = !vm.isCompact;
        $rootScope.$broadcast('isCompact', vm.isCompact);
      }

      $mdSidenav('side-nav-left').toggle();
    }
  }
  topNavComponent.$inject = ['$rootScope', '$scope', '$mdMedia', '$mdSidenav'];
})();