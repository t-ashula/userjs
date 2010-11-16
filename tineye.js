// ==UserScript==
// @name addtineye
// @author t.ashula ( office@ashula.info )
// @namespace "http://ashula.info"
// @version 0.1.12
// ==/UserScript==
(function( w, d ){
    d.addEventListener( 'DOMContentLoaded', function(){
        var SERVER = 'www.tineye.com',
            CHROME_VERSION = '1.1',
            sort_order = "&sort=score&order=desc",
            imgs = d.getElementsByTagName('img'), img, i;
        for ( i = 0;img = imgs[ i ]; ++i ){
            img.addEventListener( 'click', function( ev ){
                if ( !!ev.altKey ){
                    w.open(
                        "http://" + SERVER + "/search/?pluginver=chrome-" + CHROME_VERSION +  sort_order + "&url=" + encodeURIComponent(ev.target.src)
                    );
                }
            }, false );
        }
    }, false );
})( window, document );
