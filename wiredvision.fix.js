// ==UserScript==
// @name        WiredVision noscript fix.
// @namespace   http://ashula.info/
// @include     http://wiredvision.jp/*
// @version     0.0.1
// ==/UserScript==

(function(){
  document.addEventListener(
    'DOMContentLoaded',
    function(){
      var noss = document.getElementsByTagName('noscript');
      for ( var i = 0, nos; nos = noss[i]; ++i ) {
        nos.style.display = 'none';
      }
    },
    false
  )
})();
