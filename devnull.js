opera.addEventListener('BeforeExternalScript', function(e){
  if ( e.element.src.match(/minmax.js/) ) {
    e.preventDefault();
  }
}, false);