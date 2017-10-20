(function(){
  'use strict';

  angular.module('coreComponent')
    .service('contactsService', contactsService);

  function contactsService($http) {
    var seed = 'yparkDashboardAppDemo';

    this.getContacts = getContacts;

    ///////////////////////////////

    function getContacts(pageSize) {
      pageSize = pageSize || 50;
      var config = {
        params: {
          results: pageSize,
          seed: seed
        }
      };
      return $http.get('https://randomuser.me/api/', config)
        .then(success, error);
    }

    function success(data) {
      return data.data.results;
    }

    function error(err) {
      console.error(err);
    }
  }
  contactsService.$inject = ['$http'];
})();
