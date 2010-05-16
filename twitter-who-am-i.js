// ==UserScript==
// @name		-	Twitter, Who Am I?
// @include http://twitter.com/*
// @exclude http://twitter.com/home
// @author		-	t.ashula
// ==/UserScript==

(function(){
  document.addEventListener( "DOMContentLoaded", 
  function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',"/home?" + ((new Date()).getTime()));
    xhr.onreadystatechange=function(){
      if(xhr.status == 200 && xhr.readyState == 4){
        var profimgsrc = xhr.responseText.match( /"side_thumb .+ src="([^"]+)" / );
        var img=document.createElement( "img" );
        img.src = profimgsrc[1].replace(/_normal/,"");
        img.style.top = "0";  
        img.style.left = "0";
        img.style.width="80px";
        img.style.position="fixed";
        document.body.appendChild( img );
      }
    }
    xhr.send(null);
  }, false );
})();