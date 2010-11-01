// ==UserScript==
// @name "Force outer link target blank"
// @author t.ashula <office@ashula.info>; <http://ashula.info>
// @version 0.1
// @ujs:document http://ashula.info/opera/tips/force_outer_link_target_blank.html
// @ujs:download http://ashula.info/files/opera/tips/force_outer_link_target_blank.js
// ==/UserScript==
/*
 * This work is licensed under a Creative Commons Attribution-Share Alike 2.1 Japanese License.
 * see http://creativecommons.org/licenses/by-sa/2.1/jp/
 */
(function(){
  document.addEventListener(
    'load', 
    function(){/**/
      if ( window.top != window.self ) { 
        //opera.postError("can not handle frame page. in" + window.location );
        return;
      }
      var ignores = new Array( /^javascript:/i ); // ignore schemas
      var host = window.location.hostname;
      for(var i = 0, a; a = document.links[ i ]; ++i){
        var href = a.href, ng = false;
        for(var j = 0, ig; ig = ignores[ j ]; ++j) {
          if ( href.match( ig ) ){
            ng = true;
            break;
          }
        }
        if( !ng && !a.getAttribute( "target" ) && !href.match( host ) ){
          opera.postError( "host =" + host, "href = " + href );
          a.setAttribute( "target", "_blank" );
        }
      }/**/
    },
    false);
  }
)();
