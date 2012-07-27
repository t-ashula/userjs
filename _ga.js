(function(w){
  if ( w._gat === undefined ) { 
    w._gat = { 
      _getTracker : function(){ 
        return {
           _initData  : function(){}
          ,_trackEvent: function(){}
          ,_trackPageview : function(){}
          ,_setCustomVar : function(){}
          ,_setDomainName : function(){}
          ,_setVer: function(){}
        }; } }; }
  if (w._gaq === undefined ){
    w._gaq = {
      push : function(){}
    };
  }
})(window);
//Uncaught exception: TypeError: 'pageTracker._setDomainName' is not a function
