opera.addEventListener('BeforeCSS', function(userJSEvent){
  userJSEvent.cssText = userJSEvent.cssText
    .replace(/-webkit-gradient\(\s*(linear|radial)\s*,/g, '$1-gradient(')
    .replace(/\(\s*top\s*,/g, '(to bottom,').replace(/\(\s*bottom\s*,/g, '(to top,').replace(/\(\s*left\s*,/g, '(to right,').replace(/\(\s*right\s*,/g, '(to left,')
    .replace(/-(moz|ms|khtml|webkit|o)-(opacity|column|border|text-overflow|linear-gradient|radial-gradient|transform|transition|animation|keyframes|box-shadow)/g,'$2');
}, false);