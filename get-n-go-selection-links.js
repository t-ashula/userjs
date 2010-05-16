// ==UserScript==
// @name "Get and Go to Selection Links"
// @author t.ashula <office@ashula.info>; <http://ashula.info>
// @version 0.9
// @ujs:document http://ashula.info/opera/tips/get_n_go_selection_links.html
// @ujs:download http://ashula.info/files/opera/tips/get-n-go-selection-links.js
// ==/UserScript==
/*
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 *
 */

opera.getAndGoSelectionLinks = function() {
  var ope = opera.postError; ope = function(o){};
  ope("getAndGoSelectionLinks ");
  var conf = {
    tags : [
            {"tag": "a",      "attr": "href", "ext" : ""},
            {"tag": "img",    "attr": "src",  "ext" : ""},
	    //{"tag": "script", "attr": "src",  "ext" : ""},
            //{"tag": "embed",  "attr": "src" , "ext" : ""},
            //{"tag": "frame",  "attr": "src" , "ext" : ""},
           ],
    search_uris_in_text_node : true,
    search_uris_in_multi_node : true,
    confirm_open_window : 20,  
    // regex from http://www.din.or.jp/~ohzaki/perl.htm#httpURL
    uri_regex : new RegExp("s?h?t?tps?://[-_.!~*'()a-zA-Z0-9;/?:@&=+\$,%#]+", "gi")
  };
  
  // Array as Set
  var UriSet = function(){};
  UriSet.prototype = new Array();
  UriSet.prototype.ins_range = function( vals ) {
    ope(" typeof vals = " + typeof vals );
    if ( !vals || !vals.length ) { 
    } else {
      for ( var i = 0, val; val = vals[ i ]; ++i ) {
        this.insert( val );
      }
    }
    return this;
  };
  UriSet.prototype.insert = function( val ) {
    if ( !val ) { 
    } else {
      for ( var i = 0, cand; cand = this[i]; ++i ) {
        if ( cand == val ) { 
          return this;
        }
      }
      this.push( val );
    }
    return this;
  };
  // sub functions
  function find_selection(win) {
    var sel = win.getSelection();
    for ( var i = 0, w; w = win.frames[ i ]; ++i ) {
      if ( sel == null || sel.toString().length < 1 ) {
        sel = arguments.callee( w );
      } else {
        break;
      }
    }
    return sel;
  }

  function get_uris_in_node( node ) {
    var TEXT_NODE = 3, ELEMENT_NODE = 1;
    var get_uris_in_node2 = function( ele, urls ) {
      var nt = ele.nodeType;
      ope("ele Name is :" + ele.nodeName + "; Type is :" + nt );
      if ( nt == TEXT_NODE ) {
        if ( conf.search_uris_in_text_node ) {
          urls.ins_range( ele.nodeValue.match( conf.uri_regex ) );
        }
      } else if ( nt == ELEMENT_NODE ) {
        for ( var i = 0, tag; tag = conf.tags[ i ]; ++i ) {
          if ( ele.nodeName.toLowerCase() == tag.tag.toLowerCase() ) {
            urls.insert( ele.getAttribute( tag.attr.toLowerCase() ) );
          }
        }
        for ( var i = 0, child; child = ele.childNodes[ i ]; ++i ) {
          arguments.callee( child, urls );
        }
      }
    }
    var uris = new UriSet();
    
    if ( conf.search_uris_in_multi_node ) {
      uris.ins_range( node.innerText.match( conf.uri_regex ) );
    }
    ope( "before" + uris);
    get_uris_in_node2( node, uris );
    return uris;
  }
  
  function filtering_uris( cands ) {
    var cooked = new Array();
    //var cooked = new Set();
    var base = location.href;
    var path = location.pathname;
    var flag = location.hash;
    var que = location.search;
    var path_idx = base.indexOf(path);
    var hostpart = base.substr(0,path_idx);
    var uri_no_flag = hostpart + path;
    var uri_parent_dir = uri_no_flag.substr( 0, uri_no_flag.lastIndexOf("/") + 1 );
    for ( var i = 0, uri;uri = cands[ i ]; ++i ) {
      // scheme check
      if ( uri.match(/^(javascript:)/) )  { continue; }
      else if ( uri.match(/^(mailto:)/) ) { continue; }
      else if ( uri.match(/^(feed:)(.+)/) ){ uri = RegExp.$2; }
      else if ( uri.match(/^(ttp)/) )     { uri = "h" + uri; }
      else if ( uri.match(/^(tp)/) )      { uri = "ht" + uri; }

      // absolute uri check
      if ( uri.match(/^[\#]/) )          { continue; } // skip internal link;
      else if ( uri.match(/^[\?]/) )     { uri = uri_no_flag + uri; }
      else if ( uri.match(/^[\.]/) )     { uri = uri_parent_dir + uri; }
      else if ( uri.match(/^[\/]/) )     { uri = hostpart + uri; }
      
      if ( uri.match( /([^/]+\/\/[^/]+)(\.)$/ ) )  { uri = RegExp.$1; }
      if ( uri.match( /\/\/[^/]+$/ ) )    { uri = uri + "/"; }

      ope( "full uri : >" + uri + "<" );
      cooked.push( uri );
    }
    return cooked;
  }
  
  function open_uris( uris ) {
    var ev = document.createEvent('MouseEvent'); 
    ev.initMouseEvent( 'click', false, false, document.defaultView, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, null );
    for ( var i = 0, uri; uri = uris[ i ]; ++i ) {
      ope("gng:" + "uri[ " + i + "] = " + uri + ";");
      var aele = document.createElement('a');
      aele.href = uri;
      aele.dispatchEvent( ev );
      //window.open( uris, '_blank' );
    }
  }

  var sel = find_selection(window);
  if ( !sel || !sel.rangeCount ) {
    ope("no selection found,");
    return;
  }
  var dummy = document.createElement("div");
  dummy.appendChild( sel.getRangeAt( 0 ).cloneContents() );

  var uris = new UriSet();
  uris.ins_range( filtering_uris( get_uris_in_node( dummy ) ) );
  var uris_len = uris.length;
  if ( conf.confirm_open_window > 0 && uris_len > conf.confirm_open_window ) {
    if( !confirm( "Opening " + uris_len + " links. Is it OK ?" ) ){
      return;
    }
  }
  open_uris( uris );
}
