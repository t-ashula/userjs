// ==UserScript==
// @name dokodemopreview
// @author t.ashula ( office@ashula.info )
// @namespace "http://ashula.info"
// @version 0.1.13a
// @ujs:document http://ashula.info/opera/tips/dokodemo_preview.html
// @ujs:download http://ashula.info/files/opera/tips/dokodemo-preview.js
// ==/UserScript==

(function(){
  var IMG_MW = 'data:image/gif;base64,R0lGODlhbwBSAOYAAPQLC/Dz8WZmZsRfWswzM8SwrKokJMOloMk+OtjV0/9fXv8kJP86OszMzN4oKf+Li/+lo/9SUt8kJL6GgMhUUv8zM+rs6fqNi/+8u/9mZtaMi/GpqO8oKf729fNQTvHc2v9JSeTHxP+ZmcBzctVJRvAvLv8pKct6ef/m5P98fP+sq+G7uf/MzO87OuiPjf9cW+UvLf9COsxmZt+BgPokJMyZmfYpKvXz8eTSz/jMyugoKcdFQ/S1sv/e2/90c+/y8MyHhfny8f+TkcWAe8+wrcNYV8Jycf///+yTkvj7+fqSkM9AP7MkJP+0s/+qp8xmZt/b2evp5syZmcaIhf9mZv+hn/9eX/9BQe/39/+Af//t7MW1rdA+O9PRzuckJPLIxr96dfguLtJvbvT39c6MhP+Zmc+zrveUlM5KQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQUAP8ALAAAAABvAFIAAAf/gEeCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goYw9GE4ipxA5oqugLBAPKRkZCla1ViKfAACsnFoqDxkRVwzExFcgyKqKuoW7icy8mShVPhEMFdhh2tgVxGE8y9BH4ofk0ZRaIj4g2CYm3BXu8CZfz7q794P3zuPOzP/89unDR9DcJmrsKixQEGEBtoUN4THogKhgP0PQMhK82MzfPo2eWKSI8DCDIBALFp502M5FRUEeB+bjCJBjv5niPvLb9EDBNRM+CIFQQOiFO3ctgpTrCDMmzY0gnw4MhWLdwyaKkLCsYGPFUkJRo0ptStZmzk4YFFzhZgLroRpM/7Rps6Hh69SmOAM6xSv25k5NVayxpQHBEBADOuDZEHOuMSIhIK5xWxC0UBEv8LjKcMyZkBDJD7MgyrC1AgfGnTs7mfdAkY+jJnQAiWbwUe1IPd49rELISN1BM2hkc0AkdaTbkUDAXoDryAgmEpQIAhNXG4clUMpB3SnwIsC8fLl3v3tpg+6HSk5UX3BBvdwwEqYk0e79L9mPUsM6NYc8kofzCkkQxmQCyqXDDglUtB1YApEDkn5l8WcfJR+UAGBmmXFAQAH21HdXTR9uNFZfNmESAgw2DIghN2HoQMABAYRTVoQi0jjifhNyggMJOqSoYgVycSDBDgX8sAiJ+DkYE/+E4THFyQ01cOGADhxUWaUDCEzQxXzGMdIfJ1GYMcQAFFAwABgHdBFjl+F8+UkAFsQ5Bpt01mnnnXjmqeeefPbp55+ABirooIQWauihlgggAKKgKOqoo0coaoikkVBKKaOXRrpoJ5kemumjm2o6yKOTQiopqIKQWgiqkI7aqqWhchorrKlu2qmrhNBa66652uprqaIG68mnvwaraq+6XgpqrMYWq+mrrX5CLK/KRuvqqc7eimuz1PqqrSbTctsrItjyKiyzyRZbrSjhpnurqtV6y6y48a7LaDTf3ivtvKvkq6+s//Lib8DgHmvwossirK276v46sMDOdouquOOKSiuUw/w6hrG56R4Cr8MN33lxyN2ai2zIHds5csksf2tvuRTTufG5JAN7bagTP0ywyTsPm3HPQBeqc9CSDL3nx/UqjPPHu+YMrbAqz0pyyjDryu3EIkvd8tQKs/ysqT+z2S7XJacM9dlZV0w1yjUrC7XRrCC99NbRYg2t1WjfCzfRjuzN99+ABy744IQXbvjhiCeueCiBAAA7';
  var SCRIPT_FLAG_NAME = "anything_preview_done";
  var DONE = "done";
  var IMG_TYPE = { THUMBNAIL : 0, FAVICON : 1 };
  function nulfunc(){};
  // debug;
  var ods = opera ? ( opera.postError || nulfunc ) : nulfunc;
  ods = nulfunc;
  // return true, if element has attribute(aName) and its value is aVal
  function is_attr_val( ele, aName, aVal ) {
    if ( !ele || !aName || !aVal ){ return false;} // invalid params
    if ( !ele.hasAttribute || !ele.getAttribute ) { return false;} // no such functions
    if ( !ele.hasAttribute( aName ) ) { return false; } // no such attribute
    return ( ele.getAttribute( aName ) == aVal );
  }
  function get_full_domain( href ) {
    var domain = href.match(/http(?:s)?:\/\/[^\/]+/i);
    return domain ? domain[0].toLowerCase() : href;
  }
  // return thumbnail image url, 
  function get_def_image_url( href, type, size ) {
    function is_malicious_website( href ) {
      return href.match(/http:\/\/www\.google\..*\/interstitial\?url=/i);
    }
    var url = "";
    var mal = is_malicious_website( href ) ;
    var fqdn = get_full_domain(href);
    var protocol = "http://";
    var s = size ? size : "small";
    switch ( type ) {
      case IMG_TYPE.THUMBNAIL :
        url = ( mal ) ? IMG_MW : 
                        "http://www.thumbalizr.com/api/?url=" + href + "&width=" + ( 640 );
                        //"http://shots.snap.com/preview/?key=0158296ffafc5b535a2ed0dc8c2af907" + "&size=" + s + "&url=" + href;
        break;
      case IMG_TYPE.FAVICON : 
      {
        var host = fqdn;
        if ( host.indexOf("http://") == 0 ) {
          host = host.substring(7, host.length);
          protocol = "http://";
        } else if ( host.indexOf("https://") == 0 ) {
          host = host.substring(8, host.length);
          protocol = "https://";
        }
        url = ( mal ) ? IMG_MW : protocol + host + "/favicon.ico";
      }
      break;
      default:
        url = href;
        break;
    }
    return url;
  }
  function get_thumbnail_url( href, size ) { return get_def_image_url( href, IMG_TYPE.THUMBNAIL, size ? size : "small" ); }
  function get_favicon_url( href )   { return get_def_image_url( href, IMG_TYPE.FAVICON ); }
  function make_thumb_img( href ) {
    var thumb = document.createElement( "img" );
    thumb.setAttribute( "align", "left");
    thumb.setAttribute( "alt", href );
    thumb.setAttribute( "src", get_thumbnail_url( href ) );
    thumb.style.height = "2px";
    thumb.style.border = "1px solid #BBBBBB";
    thumb.style.margin = "2px 4px 5px 0px";
    thumb.addEventListener( "load", function(){ this.style.height = "64px"; }, false );
    thumb.addEventListener( "mouseover", function(){ this.style.height = "320px"; /*this.src = get_thumbnail_url( href, "large" );*/ }, false );
    thumb.addEventListener( "mouseout", function(){ this.style.height = "64px"; /*this.src = get_thumbnail_url( href );*/ }, false );
/**/
    return thumb;
  }
  function make_favicon_ele( href ) {
    var fav = document.createElement( "img" );
    fav.setAttribute( "alt", href );
    fav.setAttribute( "src", get_favicon_url( href ) );
    fav.style.width = "2px";
    fav.addEventListener( "load", function(e){this.style.width="16px";}, false );
    return fav;
  }
  
  function add_document_style( str ) {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.setAttribute( "type", 'text/css' );
    style.innerHTML = str;
    head.insertBefore(style, head.lastChild);
  }
  
  // generator class
  var Filter = function( name, domain, opts ) {
    this.name = name;
    this.domain = new RegExp( domain, "i" );
    for ( var opt in opts ) { this[ opt ] = opts[ opt ]; }
   }
   Filter.prototype = {
    name : "prototype",
    domain : "",
    is_my_domain   : function ( loc )  { return ( this.domain && loc.match( this.domain ) ); },
    is_target      : function ( anc )  { return false; /* FIXME:why js does not have virtual function!!!! */},
    is_target_def  : function ( anc )  {
      if ( !anc ) { return false; }
      if ( is_attr_val( anc, DONE, DONE ) ){ return false; }
      if ( ! ( anc.text != null && anc.text.length > 0 ) ) { return false; }
      var href = anc.href;
      if ( ! ( href.indexOf("http://") == 0 || href.indexOf("https://") == 0 ) ) { return false; }
      return true; },
    do_ins_thumb   : true,
    ins_thumb      : function ( anc ) {
      var href = this.get_real_url( anc.href );
      var thumb = make_thumb_img( href );
      var linka = document.createElement("a");
      linka.href = href;
      linka.insertBefore(thumb, linka.firstChild);
      var parent = anc.parentNode;
      parent.parentNode.insertBefore( linka, parent.parentNode.firstChild );
      parent.parentNode.style.clear = "left";
      anc.setAttribute( DONE, DONE ); },
    get_real_url   : function ( url )  { ods(this.name + "::get_real_url() called"); return url;},
    and_more       : function ()       { ods(this.name + "::andmore() called"); },
    do_add_favicon : false,
    add_favicon    : function ( anc ) {
      var parent = anc.parentNode;
      parent.insertBefore( make_favicon_ele( this.get_real_url( anc.href ) ), parent.firstChild ); }
  };

  var filters = [];
  // http://www.google.com
  var gglefilter = new Filter(
    "google", ".google.",
    {
      is_my_domain : function(loc) {
        ods( this.name );
        if (loc.indexOf(".google.") == -1) { return false; }
        if (loc.indexOf("news.google.") >= 0) { return false; }
        if (loc.indexOf("blogsearch.google.") >= 0) { return false; }
        if (loc.indexOf("images.google.") >= 0) { return false; }
        return true; },
      is_target : function( anc ) {
        if ( !this.is_target_def( anc ) ) { return false; }
        if ( !is_attr_val( anc.parentNode, "class", "r" ) ) { return false; }
        if ( !is_attr_val( anc.parentNode.parentNode, "class", "g" ) ) { return false; }
        return true; },
      get_real_url : function(url) {
        var urls = url.match(/http:\/\/(?:www\.)?google\.[^\/]+\/url\?.*&q=(http:.+)$/i);
        if (urls){ url = unescape(urls[1]); }
        return url; },
      and_more : function(){
        var hrs = document.getElementsByTagName("hr");
        if (hrs != null && hrs.length > 0) {
          hrs[0].style.clear = "left";
          hrs[0].style.marginTop = "120px"; 
        }}
    });
  filters.push( gglefilter );

  // http://www.yahoo.com
  var ygene = new Filter(
    "Y!Com", "http://.*search.yahoo.com.*/search",
    {
      is_target : function( anc ) {
        if ( ! this.is_target_def(anc) ) { return false ;}
        if ( ! ( is_attr_val( anc, "class", "yschttl" ) || is_attr_val( anc, "class", "rt" ) ) ){ return false; }
        return true; },
      get_real_url : function (url) {
        if ( ! ( get_full_domain(url).match(/(.*wrs|\.rds|rds)\.yahoo\.com/i) ) ) { return url; }
        var tmp = url.match(/\*\*.+$/);
        if ( tmp ) {
          url = unescape( tmp[0].substr(2) );
          //de does some special click through
          if ( url.match(/http.*\.yahoo.com\/click/i) ) { url = unescape(url.match(/u=(.*)&y=/)[1]); }
        }
        return url; },
      and_more : function() { add_document_style( "#yschweb>OL>LI { list-style-position: inside; height: 105px; clear: both; } #west>OL>LI { height: 105px; clear: both; }" ); }
    } );
  filters.push( ygene );

  // http://www.yahoo.co.jp
  var yjgene = new Filter(
    "Y!J", "http://.*search.yahoo.co.jp/search",
    {
      is_target    : ygene.is_target,
      and_more     : ygene.and_more,
      get_real_url : function(url) {
        if ( !(get_full_domain(url).match(/(.*wrs|\.rds|rds)\.search\.yahoo\.co\.jp/i)) ) { return url; }
        var tmp = url.match(/\*-.+$/);
        if ( tmp ) { url = unescape(tmp[0].substr(2)); }
        return url;}
    });
  filters.push( yjgene );

  // http://www.live.com
  var mslive = new Filter(
    "Live/MSN", "http://search.live.com/results",
    {
      is_my_domain : function(loc) {
        if ( loc.match( /http:\/\/search\.live\.com\/results/i ) ) { return true; }
        if ( loc.match( /http:\/\/search\.msn\.co.+\/(sp)?results/i ) ) { return true; }
        if ( loc.match( /http:\/\/search\.msn\.co.+\/preview/i ) ) { return true; }
        return false; },
      is_target : function(anc) {
        if ( ! this.is_target_def(anc) ) { return false; }
        if ( ! ( anc.hasAttribute("gping") )){ return false; }
        if ( ! ( anc.parentNode.localName.match( /H3/i ) ) ) { return false; }
        for ( var parent = anc.parentNode; parent != null; parent = parent.parentNode ) {
          if ( is_attr_val( parent, "ID", "ads_topC" ) ) { return false; }
          if ( is_attr_val( parent, "ID", "ads_rightC" ) ) { return false; }
          if ( is_attr_val( parent, "ID", "results" ) ) { return true; }
        }
        return false; },
      and_more : function(){ add_document_style( "LI>H3 { clear: both; }" ); }
    });
  filters.push( mslive );

  // http://search.goo.ne.jp
  var goojp = new Filter(
    "Goonejp", "http://search.goo.ne.jp/web.jsp",
    {
      is_target : function(anc){
        if ( !this.is_target_def(anc) ) { return false; }
        if ( !is_attr_val( anc.parentNode, "class", "title" ) ) { return false; }
        for ( var parent = anc.parentNode; parent != null; parent = parent.parentNode ) {
          if ( is_attr_val( parent, "ID", "sponsor" ) ) { return false; }
        }
        return true; },
      get_real_url : function(url) {
        if ( ! (get_full_domain( url ).match(/rd\.search\.goo\.ne\.jp/i ) )) { return url; }
        var tmp = url.match( /click\?DEST.+$/ );
        if ( tmp ) { url = unescape( tmp[0].substr(11) ); }
        return url; }
    });
  filters.push( goojp );

  // http://www.alltheweb.com/search
  var alltheweb = new Filter(
    "AllTheWeb", "http://www.alltheweb.com/search",
    {
      is_target : function( anc ) {
        if ( !this.is_target_def(anc) ) { return false; }
        if ( !is_attr_val( anc, "class", "res" ) ) { return false; }
        return true; },
      get_real_url : ygene.get_real_url
    } );
  filters.push(alltheweb);

  var ldjp = new Filter(
    "Livedoor.jp", "http://search.livedoor.com/search/",
    {
      is_target : function(anc) {
        if ( !this.is_target_def(anc)){ return false; }
        if ( !is_attr_val( anc.parentNode, "class", "s" ) ){ return false; }
        return true; },
      ins_thumb : function ( anc )  {
        var href = this.get_real_url( anc.href );
        var thumb = make_thumb_img( href );
        var linka = document.createElement("a");
        linka.href = href;
        linka.insertBefore(thumb, linka.firstChild);
        var parent = anc.parentNode;
        parent.insertBefore(linka, parent.firstChild);
        parent.style.clear = "left";
        anc.setAttribute( DONE, DONE ); }
    } );
  filters.push( ldjp );

  var excite = new Filter(
    "excitejp", "http://www.excite.co.jp/search.gw",
    {
      is_target : function(anc) {
        if ( !this.is_target_def(anc)){ return false; }
        if ( !is_attr_val( anc.parentNode, "class", "hit" ) ){ return false; }
        return true; },
      ins_thumb : ldjp.ins_thumb 
    } );
  filters.push(excite);

  // http://search.www.infoseek.co.jp/ITitles2
  var infoseek = new Filter(
    "infoseek", "http://search[0-9]?.www.infoseek.co.jp/",
    {
      is_target : function(anc){
        if ( !this.is_target_def(anc)){ return false; }
        if ( !is_attr_val( anc.parentNode.parentNode, "class", "data" ) ){ return false; }
        if ( anc.parentNode == anc.parentNode.parentNode.firstChild ){ return false; }
        return true; }
    } );
  filters.push( infoseek );

  // http://search.opera.com
  var operaserach = new Filter(
    "operaSearch", "http://search.opera.com/",
    {
      is_target : function(anc) {
        if ( !this.is_target_def(anc)){ return false; }
        if ( !is_attr_val( anc.parentNode, "class", "header" ) ) { return false; }
        if ( !is_attr_val( anc.parentNode.parentNode, "class", "result" ) ){ return false ;}
        return true; },
      get_real_url : function(url) {
        if ( ! (get_full_domain( url ).match(/rc6\.overture\.com/i ) )) { return url; }
        var tmp = url.match( /yargs=.+$/ );
        if ( tmp ) { url = "http://" + unescape( tmp[0].substr(6) ); }
        return url; }
    } );
  filters.push( operaserach );

  var sagooljp = new Filter(
    "SagoolJP", "http://sagool.jp/",
    {
      is_target : function(anc){
        if ( !this.is_target_def(anc)){ return false; }
        if ( !is_attr_val( anc.parentNode, "class", "title f4" ) ) { return false; }
        return true; }
    } );
  filters.push( sagooljp );

  var nifty = new Filter(
    "Nifty", "http://search.nifty.com/cgi-bin/search.cgi",
    {
      is_target : function ( anc ) {
        if ( !this.is_target_def( anc ) ) { return false; }
        if ( !is_attr_val( anc.parentNode, "class", "tt" ) ) { return false; }
        if ( !is_attr_val( anc, "class", "l" ) ) { return false; }
        return true; }
    } );
  filters.push( nifty );

  var hatenabm = new Filter(
    "?B", "http://b.hatena.ne.jp/t/",
    {
      is_target : function(anc){
        if ( !this.is_target_def( anc ) ) { return false; }
        if ( !is_attr_val( anc.parentNode, "class", "entry-body" ) ) { return false; }
        if ( !is_attr_val( anc.parentNode.parentNode, "class", "entry" ) ) { return false; }
        return true; }
    } );
  filters.push( hatenabm );

  var delicious = new Filter(
    "del.icio.us", "http://del.icio.us/",
    {
      is_target : function( anc ) {
        if ( !this.is_target_def( anc ) ) { return false; }
        if ( !is_attr_val( anc.parentNode, "class", "desc" ) ){ return false; }
        if ( !is_attr_val( anc.parentNode.parentNode, "class", "post" ) ){ return false; }
        return true; }
    } );
  filters.push( delicious );

  function anythingpreview(url) {
    for ( var i = 0, ftr; ftr = filters[ i ]; ++i ) {
      if ( ftr.is_my_domain( url ) ) { break; }
    }
    if ( ftr == null ) { return; }
    var ancs = document.getElementsByTagName("a");
    for ( var i = 0, anc; anc = ancs[ i ]; ++i ) {
      if ( ftr.is_target( anc ) ) {
        if ( ftr.do_ins_thumb )   { ftr.ins_thumb( anc ); }
        if ( ftr.do_add_favicon ) { ftr.add_favicon( anc ); }
      }
    }
  }  
  document.addEventListener('DOMContentLoaded', function(){ anythingpreview(window.location.href);}, false );
//  document.addEventListener('load', function(){ anythingpreview(window.location.href);}, false );

})();
