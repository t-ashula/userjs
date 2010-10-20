if (location.hostname === 'www.jma.go.jp' ) {
  opera.addEventListener(
    'BeforeScript', function(e) { 
      if ( /hisjs\/OptAmedas.js/.test(e.element.src) ) {
        e.element.text = e.element.text.replace( /rtnDate\s=\siMonth\s\+/, 'rtnDate+=iMonth;rtnDate+=' );
      }
    }, false );
}
/*if (location.hostname.indexOf('www.jma.go.jp') != -1) {
  opera.addEventListener(
    'BeforeScript', function(e) { 
      if ( /hisjs\/OptAmedas/.test(e.element.src) ) {
        e.element.text = e.element.text.replace( /rtnDate\s=\siMonth\s\+/, 'rtnDate+=iMonth;rtnDate+=' );
      }
    }, false );
}*/
