opera.addEventListener('BeforeScript', function(e) {
  if ( /apple_core/.test(e.element.src) ) { 
    e.element.text = e.element.text.replace( /g.replace\(\/\[\\'\\"\\.+\n/, 'g.replace(/[\\\'\\\"�g�h�e�f]/g,"")' );
  }
}, false );