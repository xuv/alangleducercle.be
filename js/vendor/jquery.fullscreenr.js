(function($){   
    $.fn.fullscreenr = function(options) {
        if(options.height === undefined) alert('Please supply the background image height, default values will now be used. These may be very inaccurate.');
        if(options.width === undefined) alert('Please supply the background image width, default values will now be used. These may be very inaccurate.');
        if(options.bgID === undefined) alert('Please supply the background image ID, default #bgimg will now be used.');
        var defaults = { width: 1280,  height: 1024, bgID: 'bgimg' },
            options = $.extend({}, defaults, options); 
        $(document).ready(function() { $(options.bgID).fullscreenrResizer(options); });
        $(window).bind("resize", function() { $(options.bgID).fullscreenrResizer(options); });      
        return this;        
    };  
    $.fn.fullscreenrResizer = function(options) {
        // Set bg size
        var elem = $(this), w = $(window),
            ratio = options.height / options.width,
            // Get browser window size
            browserwidth = w.width(),
            browserheight = w.height();
        // Scale the image
        if ((browserheight / browserwidth) < ratio) {
          elem.height(browserheight)
              .width(browserheight / ratio);
        } else {
          elem.width(browserwidth)
              .height(browserwidth * ratio);
        }
        // Center the image
        elem.css('left', (browserwidth - elem.width())/2)
            .css('top', (browserheight - elem.height())/2);
        return this;        
    };
})(jQuery);