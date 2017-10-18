(function(){
  'use strict';

  angular.module('homeComponent')
    .controller('homeComponent', homeComponent);

  function homeComponent() {
    this.test = 'allo';
  }
  homeComponent.$inject = [];
})();
