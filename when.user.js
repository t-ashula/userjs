// ==UserScript==
// @include     http://twitter.com/*
// ==/UserScript==
(function(){
  if ( document.body.id == 'profile' ) {
    var sc = document.querySelector('div.screen-name');//document.getElementById('user_screen_name');
    var username = sc.innerHTML.replace(/[:,\'.]/g, " ");
    var cleanName = escape(username);
    var urlToGet = "http://twitter.com/users/show/" + cleanName + ".json?suppress_response_codes=1&callback=?";
    $.getJSON(urlToGet, function(data) {
      if (!data.created_at) return;
      var myArray = data.created_at.split(' ');
      var input = myArray[0] + ', ' + myArray[2] + ' ' + myArray[1] + ' ' + myArray[3] + ' ' + myArray[5].substring(0, 4);
      var theDate = new Date(Date.parse(input));
      var month_names = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      var myDateStr = theDate.getDate() + " " + month_names[theDate.getMonth()] + " " + theDate.getFullYear();
      var daysSince = Math.round(((new Date()).getTime() - theDate.getTime()) / (1000 * 60 * 60 * 24));
      var li = document.createElement('li');
      li.innerHTML = "<span class='label'>When:</span>" + "<span>" + myDateStr + ", " + daysSince + " days </span>";
      //document.querySelector('div#profile > address > ul').appendChild( li );
      document.querySelector('div.component > ul.user-stats.clearfix').appendChild( li );
      
    });
  }
})();
