(function(){
  'use strict';

  angular.module('coreComponent')
    .animation('.slide', slide);

  function slide($animateCss) {
    var transitionTimingFunction = 'cubic-bezier(.35,0,.25,1)',
      transitionDuration = '.35';

    return {
      enter: function(element, doneFn) {
        var animationSlide = $animateCss(element, {
            easing: transitionTimingFunction,
            from: {
              transform: 'translateX(100%)',
              position: 'absolute',
              left: 0,
              top: 0
            },
            to: {
              transform: 'translateX(0)'
            },
            duration: transitionDuration,
            cleanupStyles: true
          }),
          animationHeight = $animateCss(element.parent(), {
          addClass: 'entering',
          easing: transitionTimingFunction,
          from: {
            height: element.next()[0].offsetHeight + 'px'
          },
          to: {
            height: element[0].offsetHeight + 'px'
          },
          duration: transitionDuration,
          cleanupStyles: true
        });
        animationHeight.start().done(function(){
          element.parent().css({
            height: ''
          });
        });
        animationSlide.start().done(function(){
          element.css({
            position: '',
            top: ''
          });
        });
      },
      leave: function(element, doneFn) {
        return $animateCss(element, {
          easing: transitionTimingFunction,
          from: {
            transform: 'translateX(0)',
            position: 'absolute',
            left: 0,
            top: 0
          },
          to: {
            transform: 'translateX(-100%)'
          },
          duration: transitionDuration,
          cleanupStyles: true
        });
      }
    };
  }
  slide.$inject = ['$animateCss'];
})();
