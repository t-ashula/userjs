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
      var p = a.parentNode, t = p.textContent, pp = p.parentNode, url = m[1]
      var nr = new RegExp( '(.+)?' + url + '(.+)?' );
      var ts = t.match( nr );
      var n = document.createElement( 'div' ); 
      n.setAttribute( 'class', 'theTweet' );
      n.appendChild( document.createTextNode( ts[1] ) );
      var na = document.createElement('a');
      na.href = url; 
      na.appendChild( document.createTextNode( url ) );
      n.appendChild( na );
      ts[2] && n.appendChild( document.createTextNode( ts[2] ) );
      pp.replaceChild( n, p );
    }
  }
})();
