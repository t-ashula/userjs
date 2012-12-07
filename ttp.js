// ==UserScript==
// @name        ttp?
// @namespace   ashula.info"
// @author t.ashula ( office@ashula.info )
// @version 0.1
// @include ttp://*
// @exclude http://*
// ==/UserScript==

(function(w){
  var q = w.document.querySelector('cite a');
  if ( !q || !q.href ){
    return;
  }
  w.location = 'h' + q.href;
}(window));