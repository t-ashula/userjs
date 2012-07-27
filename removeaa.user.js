(function(ls){
  for(var i = 0,l; l = ls[i]; ++i ){
    if (l.href.match(/amazon/)){
      l.href = l.href.replace(/(.+amazon\..+)(\?tag=.+-22)/, function($0, $1){ return $1; })
        .replace(/(.+amazon\..+\/)([^/]+-22)/, function($0, $1){ return $1; });
    }
    //http://hb.afl.rakuten.co.jp/hgc/088092a4.b650f830.0faa39e5.2f1c0023/?pc=http%3a%2f%2fauction.item.rakuten.co.jp%2f11308130%2fa%2f10001737%2f%3fl-id%3dprofile_itemlist_others%26scid%3daf_ich_link_urltxt&m=http%3a%2f%2fa.rakuten.co.jp%2f
    if (l.href.match(/afl.rakuten.+\?pc=/)){
      l.href = l.href.replace(/^(.+\?pc=)(.+)(%3f.+)$/, function($0, $1, $2){ return decodeURIComponent($2); });
    }
  }
})(document.links);