(function(){
  'use strict';

  angular.module('contactsComponent')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('root.contacts', {
        url: '/contacts',
        views: {
          'content@root': {
            templateUrl: 'source/components/contacts/contacts.component.html',
            controller: 'contactsComponent',
            controllerAs: 'contactsVm'
          }
        },
        data: {
          pageTitle: 'Contacts',
          menuIcon: 'person',
          pageColor: 'accent-A400'
        }
      })
  }
  routeConfig.$inject = ['$stateProvider'];
})();
