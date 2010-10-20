// ==UserScript==
// @name Fix content type
// @author t.ashula
// @namespace http://ashula.info/
// ==/UserScript==

(function(){
  window.addEventListener( 'load', function () {
    var flooding = function( d ){
      return !location.pathname.match(/.(js|css|txt)$/) &&
         ( d.getElementsByTagName( 'head' )[ 0 ].children.length === 0 );
    };
    var binarray = function( d ){
      this.d_ = d;
      this.getByteAt = function( i ){ return this.d_.charCodeAt( i ) & 0xff; };
    };
    var getHead = function( url, cb ) {
      var xhr = new XMLHttpRequest();
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
    if ( flooding( document ) ) {
      getHead( location.pathname, function( bary ){
        if ( isImage( bary ) ) {
          document.body.innerHTML = '<img src="' + location.href + '" alt="" />';
        } 
        else {
          document.body.innerHTML = '<p><a href="' + location.href +'">download</a></p>';
        }
      });
    }
  },false);
})();