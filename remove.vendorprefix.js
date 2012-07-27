opera.addEventListener('BeforeCSS', function(userJSEvent){
  userJSEvent.cssText = userJSEvent.cssText
    .replace(/-(moz|ms|khtml|webkit|o)-(opacity|column|border|text-overflow)/g,'$2')
    .replace(/-(moz|ms|khtml|webkit)-(linear-gradient|radial-gradient|transform|transition|animation|keyframes)/g,'-o-$2')
    .replace(/-(moz|ms|khtml|webkit)-(box-shadow)/g,'-o-$2');
}, false);