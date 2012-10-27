// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Preload images
(function($) {
    var imgList = [];
    $.extend({
        preload: function(imgArr, option) {
            var setting = $.extend({
                init: function(loaded, total) {},
                loaded: function(img, loaded, total) {},
                loaded_all: function(loaded, total) {}
            }, option);
            var total = imgArr.length;
            var loaded = 0;
            
            setting.init(0, total);
            for(var i in imgArr) {
                imgList.push($('<img class="dessin hidden" alt="dessin de Carl" />')
                    .attr("src", imgArr[i])
                    .load(function() {
                        loaded++;
                        setting.loaded(this, loaded, total);
                        if(loaded == total) {
                            setting.loaded_all(loaded, total);
                        }
                    })
                );
            }
            
        }
    });
})(jQuery);

