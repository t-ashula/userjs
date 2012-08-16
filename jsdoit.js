// ==UserScript==
// @name        jsdoit.js
// @author      t.ashula
// @version     0.1
// @namespace   http://ashula.info/
// @include     http://jsdo.it/*
// ==/UserScript==

(function(){
  window.addEventListener('DOMContentLoaded',function(){
    var css = '#navPrimaryTag li { display: table-cell !important; }';
    css += '#navPrimaryTag li a{ display: inline !important; }';
    var s = document.createElement('style');    
    s.innerText = css;
    document.head.appendChild(s);
  });
})();

