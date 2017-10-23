(function(){
  'use strict';

  angular.module('widgetPickerComponent')
    .controller('addWidgetDialogComponent', addWidgetDialogComponent);

  function addWidgetDialogComponent($mdDialog, widgetPickerService) {
    var vm = this;

    vm.availableWidgets = widgetPickerService.getWidgetNames();

    vm.closeDialog = closeDialog;
    vm.confirm = confirm;

    ///////////////////////////////

    function confirm() {
      if(vm.selectedWidget) {
        $mdDialog.hide({
          selectedWidget: vm.selectedWidget
        });
      }
    }

    function closeDialog() {
      $mdDialog.cancel();
    }
  }
  addWidgetDialogComponent.$inject = ['$mdDialog', 'widgetPickerService'];
})();
