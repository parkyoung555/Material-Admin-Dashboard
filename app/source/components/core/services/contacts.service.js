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
      var contacts = data.data.results;

      contacts.sort(function(a, b) {
        var textA = (a.name.first + ' ' + a.name.last).toUpperCase();
        var textB =(b.name.first + ' ' + b.name.last).toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

      return contacts;
    }

    function error(err) {
      console.error(err);
    }
  }
  contactsService.$inject = ['$http'];
})();
