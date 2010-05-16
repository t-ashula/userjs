// ==UserScript==
// @name        extreme fast forward
// @author      t.ashula
// @version     0.1
// @namespace   http://ashula.info/
// @include     http://*
// ==/UserScript==
(function(w){
  function appendNav(type,href,force){
    var h = document.getElementsByTagName('head')[0];
    if ( !h ) return;
    if ( !force && document.querySelector('link[rel=' + type + ']') ) return;
    var l = document.createElement('link');
    l.rel = type;
    l.href = href;
    h.appendChild(l);
  }
  for (var as = document.links, a, i = 0; a = as[i]; ++i ) {
    if ( a.rel && a.rel == "next" && a.href) appendNav('next', a.href );
    if ( a.rel && a.rel == "prev" && a.href) appendNav('prev', a.href );
  }
})(window);
