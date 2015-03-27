// SwingJS.js

// BH 3/27/2015 6:34:49 AM  just a shell

if(typeof(jQuery)=="undefined") alert ("Note -- jQuery is required for SwingJS, but it's not defined.")


self.SwingJS || (SwingJS = {});


(function (SwingJS, $) {
  SwingJS.getApplet = function(name, info) {
    alert("getApplet " + name)
  }
  
  
})(SwingJS, jQuery);
