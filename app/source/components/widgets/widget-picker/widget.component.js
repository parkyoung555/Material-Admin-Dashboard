(function(){
  'use strict';

  angular.module('widgetPickerComponent')
    .controller('widgetPickerComponent', widgetPickerComponent);

  function widgetPickerComponent($scope, themeService, widgetPickerService, $mdDialog, $mdToast, profileService) {
    var vm = this,
      toast = $mdToast.simple()
        .hideDelay(6000)
        .highlightAction(true)
        .highlightClass('md-accent');

    vm.availableWidgets = widgetPickerService.getWidgetNames();

    vm.addWidget = addWidget;

    //////////////////////////////

    function addWidget(ev) {
      $mdDialog.show({
        controller: 'addWidgetDialogComponent',
        controllerAs: 'addWidgetDialogVm',
        templateUrl: 'source/components/widgets/widget-picker/add-widget-dialog/dialog.component.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: false
      }).then(function(widget) {
        profileService.addWidget(widget.selectedWidget);
        toast
          .textContent('Widget added.')
          .action('OK');

        $mdToast.show(toast);
      });
    }
  }
  widgetPickerComponent.$inject = ['$scope', 'themeService', 'widgetPickerService', '$mdDialog', '$mdToast', 'profileService'];
})();
