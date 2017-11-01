(function(){
  'use strict';

  angular.module('coreComponent')
    .service('userService', userService);

  function userService(widgetsUtilityService, $firebaseArray) {
    var db = $firebaseArray(firebase.database().ref('/users')),
      gravatarUrl = 'https://www.gravatar.com/avatar/',
      fallBackImage = 'https://api.adorable.io/avatars/64/';

    this.fluidGridOptions = {
      columns: 8, // the width of the grid, in columns
      pushing: true, // whether to push other items out of the way on move or resize
      floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
      margins: [16, 16],
      minRow: 1,
      width:'auto',
      maxRows: 1000,
      rowHeight: (112 / 2) + 8,
      draggable: {
        enabled: false
      },
      dynamicContent: {
        name: 'component',
        selector: '.widget-component'
      },
      resizable: {
        enabled: false,
        start: function(event, $element, item) {

        }, // optional callback fired when resize is started,
        resize: function(event, $element, item) {
          widgetsUtilityService.reflowHighcharts();
        }, // optional callback fired when item is resized,
        stop: function(event, $element, item) {
          widgetsUtilityService.reflowHighcharts();
        } // optional callback fired when item is finished resizing
      }
    };
    this.activeWidgets = [
      {
        id: 0,
        widgetId: 1,
        sizeX: widgetsUtilityService.defaultSizes['revenue'][0], sizeY: widgetsUtilityService.defaultSizes['revenue'][1],
        component: 'revenue'
      },
      {
        id: 1,
        widgetId: 1,
        sizeX: widgetsUtilityService.defaultSizes['revenue'][0], sizeY: widgetsUtilityService.defaultSizes['revenue'][1],
        component: 'revenue'
      },
      {
        id: 2,
        widgetId: 1,
        sizeX: widgetsUtilityService.defaultSizes['revenue'][0], sizeY: widgetsUtilityService.defaultSizes['revenue'][1],
        component: 'revenue'
      },
      {
        id: 3,
        widgetId: 1,
        sizeX: widgetsUtilityService.defaultSizes['revenue'][0], sizeY: widgetsUtilityService.defaultSizes['revenue'][1],
        component: 'revenue'
      },
      {
        id: 4,
        widgetId: 2,
        sizeX: widgetsUtilityService.defaultSizes['sales-performance'][0], sizeY: widgetsUtilityService.defaultSizes['sales-performance'][1],
        component: 'sales-performance'
      },
      {
        id: 5,
        widgetId: 3,
        sizeX: widgetsUtilityService.defaultSizes['to-do-list'][0], sizeY: widgetsUtilityService.defaultSizes['to-do-list'][1],
        component: 'to-do-list'
      },
      {
        id: 6,
        widgetId: 4,
        sizeX: widgetsUtilityService.defaultSizes['weather'][0], sizeY: widgetsUtilityService.defaultSizes['weather'][1],
        component: 'weather'
      }
    ];

    this.addWidget = addWidget;
    this.removeWidget = removeWidget;
    this.getUserInfo = getUserInfo;
    this.setUserInfo = setUserInfo;
    this.getGravatar = getGravatar;

    ///////////////////////////////////

    function removeWidget(id) {
      for(var i = 0, len = this.activeWidgets.length; i < len; i++) {
        if(this.activeWidgets[i].id === id) {
          this.activeWidgets.splice(i, 1);
          return true;
        }
      }
    }

    function addWidget(widgetName) {
      this.activeWidgets.push({
        id: new Date().getTime(),
        sizeX: widgetsUtilityService.defaultSizes[widgetName][0],
        sizeY: widgetsUtilityService.defaultSizes[widgetName][1],
        component: widgetName
      });
    }

    function getUserInfo(email) {
      return db.$loaded(function(data){
       return data.$getRecord(SparkMD5.hash(email));
      });
    }

    function setUserInfo(email, info) {
      var key = SparkMD5.hash(email);
      return db.$ref().child(key).set(info);
    }

    function getGravatar(email) {
      return gravatarUrl + SparkMD5.hash(email) + '?d=' + encodeURIComponent(fallBackImage + email);
    }
  }
  userService.$inject = ['widgetsUtilityService', '$firebaseArray'];
})();
