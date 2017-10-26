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
          'email': {
            templateUrl: 'source/components/login/email/email.component.html',
            controller: 'emailComponent',
            controllerAs: 'emailVm'
          }
        },
        data: {
          pageTitle: 'Sign In'
        }
      })
      .state('login.password', {
        url: '/login/password',
        views: {
          'password': {
            templateUrl: 'source/components/login/password/password.component.html',
            controller: 'passwordComponent',
            controllerAs: 'passwordVm'
          }
        },
        data: {
          pageTitle: 'Sign In'
        },
        resolve: {
          userEmail: ['loginService', '$state', function(loginService, $state) {
            if(!loginService.email) {
              $state.go('login.email');
            }
          }]
        }
      })
      .state('login.signUp', {
        url: '/sign-up',
        views: {
          'signUp': {
            templateUrl: 'source/components/login/sign-up/sign-up.component.html',
            controller: 'signUpComponent',
            controllerAs: 'signUpVm'
          }
        },
        data: {
          pageTitle: 'Sign Up',
          subTitle: 'Join us. We have cookies.'
        }
      })
      .state('login.signInOptions', {
        url: '/sign-in-options',
        views: {
          'signInOptions': {
            templateUrl: 'source/components/login/sign-in-options/sign-in-options.component.html',
            controller: 'sign-in-optionsComponent',
            controllerAs: 'sign-in-optionsVm'
          }
        },
        data: {
          pageTitle: 'Choose an Account'
        }
      });
  }
  routeConfig.$inject = ['$stateProvider'];
})();
