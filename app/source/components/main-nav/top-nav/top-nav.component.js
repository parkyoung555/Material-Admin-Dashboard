(function(){
  'use strict';

  angular.module('mainNavComponent')
    .controller('topNavComponent', topNavComponent);

  function topNavComponent($rootScope, $scope, $mdMedia, $mdSidenav) {
    var vm = this;
    vm.isCompact = !$mdMedia('gt-md');
    vm.toggleCompactMenu = toggleCompactMenu;

    $scope.$watch(function(){
      window.dispatchEvent(new Event('resize'));
      return $mdMedia('gt-md');
    }, function(md){
      vm.isCompact = !md;
      $rootScope.$broadcast('isCompact', vm.isCompact);
    });

    ////////////////////////////////

    function toggleCompactMenu() {
      window.dispatchEvent(new Event('resize'));
      if($mdMedia('gt-md')) {
        vm.isCompact = !vm.isCompact;
        $rootScope.$broadcast('isCompact', vm.isCompact);
      }

      $mdSidenav('side-nav-left').toggle();
    }
  }
  topNavComponent.$inject = ['$rootScope', '$scope', '$mdMedia', '$mdSidenav'];
})();
