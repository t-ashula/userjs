opera.addEventListener('BeforeCSS', function(userJSEvent){
  userJSEvent.cssText = userJSEvent.cssText
    .replace(/-(moz|ms|khtml|webkit|o)-(opacity|column|border|text-overflow)/g,'$2')
    .replace(/-(moz|ms|khtml|webkit|o)-(linear-gradient|radial-gradient|transform|transition|animation|keyframes)/g,'$2')
    .replace(/-(moz|ms|khtml|webkit|o)-(box-shadow)/g,'$2');
}, false);