// ==UserScript==
// @name Fix content type
// @author t.ashula
// @namespace http://ashula.info/
// ==/UserScript==

(function( win, loc, doc ){
  var fixbin = function(){
    var flooding = function( w_, l_, d_ ){
      return w_ === w_.top
        && !l_.pathname.match(/.(js|css|txt|html)$/)
        && ( d_.getElementsByTagName( 'head' )[ 0 ].children.length === 0 )
        && ( d_.body.innerHTML.indexOf('\uFFFD') !== -1);
    };
    var binarray = function( data ){
      this.data_ = data;
      this.getByteAt = function( i ){ return this.data_.charCodeAt( i ) & 0xff; };
    };
    var getHead = function( url, cb ) {
      var xhr = new window.XMLHttpRequest();
      xhr.open( 'GET', url );
      xhr.setRequestHeader( 'Range', 'bytes=0-50' );
      xhr.overrideMimeType( 'text/plain; charset=x-user-defined' );
      xhr.onreadystatechange = function(){
        if ( xhr.readyState === 4 && xhr.status === 200 ){
          cb( new binarray( xhr.responseText ) );
        }
      };
      xhr.send( null );
    };
    var isImage = function( ba ){
      var isJpeg = (function( bj ){
        return bj.getByteAt( 0 ) == 0xff && bj.getByteAt( 1 ) == 0xd8; })( ba );
      var isPng = (function( bp ) { 
        var h = [ bp.getByteAt( 0 ), bp.getByteAt( 1 ), bp.getByteAt( 2 ), bp.getByteAt( 3 ) ];
        return h[ 0 ] == 0x89 && h[ 1 ] == 0x50 && h[ 2 ] == 0x4e && h[ 3 ] == 0x47; })( ba );
      return isJpeg || isPng;
    };
    if ( flooding( win, loc, doc ) ) {
      getHead( loc.href, function( bary ){
        if ( isImage( bary ) ) {
          doc.body.innerHTML = '<img src="' + loc.href + '" alt="" />';
        } 
        else {
          doc.body.innerHTML = '<p><a href="' + loc.href +'">download</a></p>';
        }
      });
    }  
  };
  win.addEventListener( 'load', function () { fixbin(); }, false );
})( window, window.location, document );