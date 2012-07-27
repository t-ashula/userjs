// ==UserScript==
// @name        f_ck.nikkei.js
// @author      t.ashula
// @version     1
// @namespace   http://ashula.info
// @include     http://business.nikkeibp.co.jp/welcome/welcome.html?*
// ==/UserScript==


function entopt(s, name, value){
  var opt, i, flg, aname;
  flg = true;
  if (s.indexOf('#') >= 0){
    aname= s.substring(s.indexOf('#') + 1, s.length);
    s = s.substring(0, s.indexOf('#'));
  }
  else{
    aname = '';
  }
  if ((opt = s.split('?')[1])){
    var opts = opt.split('&');
    for(i = 0; i < opts.length; i++){
      if (opts[i].match(new RegExp('^' + name + '=', 'i'))){
        opts[i] = name + '=' + value;
        flg = false;
        break;
      }
    }
    s = s.split('?')[0] + '?' + opts.join('&');
    if (flg){
      s = s + '&' + name + '=' + value;
    }
  }else{
    s = s + '?' + name + '=' + value;
  }
  return (aname == '') ? s : s + '#' + aname;
}

function goBackSite(){
  var url = decodeURIComponent(location.search.substr(1));
  if (url.match(/^https?:\/\/[^/]+\.nikkeibp\.co\.jp\//i)){
    location.href = entopt(url, 'rt', 'nocnt');
  }
  else{
    location.href = "http://business.nikkeibp.co.jp/";
  }
}

goBackSite();