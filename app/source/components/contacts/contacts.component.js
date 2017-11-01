(function(){
  'use strict';

  angular.module('contactsComponent')
    .controller('contactsComponent', contactsComponent);

  function contactsComponent(contactsService) {
    var vm = this;

    getContacts().then(function(data){
      var contacts = {},
      letter = '';
      for(var i = 0, len = data.length; i < len; i++) {
        letter = (data[i].name.first + data[i].name.last).substring(0,1).toUpperCase();
        if(contacts[letter]) {
          contacts[letter].push(data[i]);
        } else {
          contacts[letter] = [data[i]];
        }
      }
      vm.contacts = contacts;
    });

    /////////////////////////

    function getContacts() {
      return contactsService.getContacts();
    }
  }
  contactsComponent.$inject = ['contactsService'];
})();
