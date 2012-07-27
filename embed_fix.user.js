// ==UserScript==
// @name        embed fix
// @namespace   "http://ashula.info"
// @checkurl    http://ashula.info/files/opera/tips/embed_fix.user.js
// @lastupdate  2009/09/18 03:22:02
// @author t.ashula ( office@ashula.info )
// @version 0.4
// @ujs:document http://ashula.info/opera/tips/embed_fix.html
// @ujs:download http://ashula.info/files/opera/tips/embed_fix.user.js
// @exclude http://www.dailymotion.com/video/*
// @exclude http://preferred.jp/*
// ==/UserScript==

(function (){
  var embeds = document.getElementsByTagName("embed");
  if ( !embeds || embeds.length < 1 ) {
    return;
  }
  for( var i = 0, emb; emb = embeds[ i ]; ++i ){
    var w = emb.getAttribute("width");
    var h = emb.getAttribute("height");
    var pa = emb.parentNode;      
    if ( pa.tagName.match(/object/i) ) { pa = pa.parentNode; }
    if ( w == -100 || w == "100%" ){ 
      var nw = pa.style.width;
      if ( /*nw == "100%" ||*/ nw == -100 || nw == "" ) { nw = window.innerWidth; }
      emb.setAttribute("width", nw );
      opera.postError("embfix : fix width to " + nw );
    }
    if ( h == -100 || h == "100%" ){ 
      var nh = pa.style.height; 
      if ( /**/ nh == "100%" ||/**/ nh == -100 || nh == "" ) { nh = window.innerHeight; }
      emb.setAttribute("height", nh );
      emb.style.height = nh;
      pa.style.height = nh;
      opera.postError("embfix : fix height to " + nh );
    }
    var ob = emb.parentNode;
    if ( !(ob.tagName.match(/object/i) && ob.children ) ) {
      continue;
    }
    //ob.style.display = "none"; ob.removeChild( emb ); ob.style.display = "block";
    var src = emb.getAttribute("src");
    var params = ob.children;
    for ( var j = 0, param; param = params[ j ]; ++j ) {
      if ( ! param.tagName.match(/param/i ) ) continue;
      if ( ! param.hasAttribute("name") ) continue;
      if ( ! param.getAttribute("name").match(/movie/i) ) continue;
      if ( ! param.hasAttribute("value") ) continue;
      if ( src == param.getAttribute("value") ) break; // break; for(param)
      ob.style.display = "none";
      emb.setAttribute("src", param.getAttribute("value") );
      ob.style.display = "block";
      opera.postError( "embfix : replaced" + src + " to " + emb.getAttribute("src") );
    }
  }
})();
