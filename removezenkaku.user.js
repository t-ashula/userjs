// ==UserScript==
// @name        remove 
// @author      t.ashula
// @version     1
// @namespace   http://ashula.info
// @include     http://www.nikkei.com/*
// @include     http://smhn.info/*
// ==/UserScript==

(function(body){
  body.innerHTML = body.innerHTML.replace(/[Ａ-Ｚ]/g, function($0){ return String.fromCharCode('A'.charCodeAt(0) + $0.charCodeAt(0) - 'Ａ'.charCodeAt(0)); })
    .replace(/[ａ-ｚ]/g, function($0){ return String.fromCharCode('a'.charCodeAt(0) + $0.charCodeAt(0) - 'ａ'.charCodeAt(0)); })
    .replace(/[０-９]/g, function($0){ return String.fromCharCode('0'.charCodeAt(0) + $0.charCodeAt(0) - '０'.charCodeAt(0)); })
    .replace(/．/g, function($0){ return '.'; })
    .replace(/／/g, function($0){ return '/'; });
  
})(document.body);