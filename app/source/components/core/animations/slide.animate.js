(function(){
  'use strict';

  angular.module('coreComponent')
    .animation('.slide', slide);

  function slide($animateCss) {
    var transitionTimingFunction = 'cubic-bezier(.35, 0, .25, 1)',
      transitionDuration = '.35';

    return {
      enter: function(element, doneFn) {
        var nextElem = element.next(),
          animationSlide = {
            easing: transitionTimingFunction,
            duration: transitionDuration,
            cleanupStyles: true
          },
          animationHeight = {
            addClass: 'entering',
            easing: transitionTimingFunction,
            duration: transitionDuration,
            cleanupStyles: true
          };

        if(nextElem[0].offsetHeight) {
          animationSlide.from = {
            transform: 'translate3d(100%, 0, 0)',
            position: 'absolute',
            left: 0,
            top: 0
          };
          animationSlide.to = {
            transform: 'translate3d(0, 0, 0)'
          };
          animationHeight.from = {
            height: nextElem[0].offsetHeight  + 'px'
          };
          animationHeight.to = {
            height: element[0].offsetHeight + 'px'
          }
        }

        $animateCss(element.parent(), animationHeight).start().done(function(){
          element.parent().css({
            height: ''
          });
        });
        $animateCss(element, animationSlide).start().done(function(){
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
            transform: 'translate3d(0, 0, 0)',
            position: 'absolute',
            left: 0,
            top: 0
          },
          to: {
            transform: 'translate3d(-100%, 0, 0)'
          },
          duration: transitionDuration,
          cleanupStyles: true
        });
      }
    };
  }
  slide.$inject = ['$animateCss'];
})();
