(function(){
  'use strict';

  angular.module('loginComponent')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('login', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'source/components/login/login.component.html',
            controller: 'loginComponent',
            controllerAs: 'loginVm'
          }
        }
      })
      .state('login.email', {
        url: '/login/email',
        views: {
          '': {
            templateUrl: 'source/components/login/email/email.component.html',
            controller: 'emailComponent',
            controllerAs: 'emailVm'
          }
        },
        data: {
          pageTitle: 'Sign In',
          showLoginHistoryMenu: true
        }
      })
      .state('login.password', {
        url: '/login/password',
        views: {
          '': {
            templateUrl: 'source/components/login/password/password.component.html',
            controller: 'passwordComponent',
            controllerAs: 'passwordVm'
          }
        },
        data: {
          pageTitle: 'Sign In',
          showLoginHistoryMenu: true
        },
        resolve: {
          redirect: ['loginService', function(loginService) {
            if(!loginService.email) {
              return 'login.email';
            }
          }]
        }
      })
      .state('login.signUp', {
        url: '/sign-up',
        views: {
          '': {
            templateUrl: 'source/components/login/sign-up/sign-up.component.html',
            controller: 'signUpComponent',
            controllerAs: 'signUpVm'
          }
        },
        data: {
          pageTitle: 'Sign Up',
          subTitle: 'Join us. We have cookies.',
          showLoginHistoryMenu: true
        }
      })
      .state('login.signInOptions', {
        url: '/sign-in-options',
        views: {
          '': {
            templateUrl: 'source/components/login/sign-in-options/sign-in-options.component.html',
            controller: 'signInOptionsComponent',
            controllerAs: 'signInOptionsVm'
          }
        },
        data: {
          pageTitle: 'Choose an Account',
          hideProfileImage: true
        }
      });
  }
  routeConfig.$inject = ['$stateProvider'];
})();
