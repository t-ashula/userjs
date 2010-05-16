// ==UserScript==
// @name        Favstar.fm link fix.
// @namespace   http://ashula.info/
// @include     http://favstar.fm/*
// @include     http://*.favstar.fm/*
// @version     0.0.1
// ==/UserScript==

(function(){
  var base = location.href.split( '/' ).slice( 0, -1 ).join( '/' );
  var ancs = document.querySelectorAll('.theTweet > a');
  var r = new RegExp( '^' + base + '/[%0-9A-Z]+(http://.+)', i );
  for ( var i = 0, a; a = ancs[i]; ++i ) {
    var m = a.href.match(r);
    if ( m && m[1] ) {
      a.href = m[1];
    }
  }
})();
