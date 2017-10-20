(function(){
  'use strict';

  angular.module('contactsComponent')
    .controller('contactsComponent', contactsComponent);

  function contactsComponent(contactsService) {
    var vm = this;

    getContacts().then(function(data){
      vm.contacts = data;
    });

    /////////////////////////

    function getContacts() {
      return contactsService.getContacts();
    }
  }
  contactsComponent.$inject = ['contactsService'];
})();
