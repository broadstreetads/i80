var cache = require('memory-cache');

/**
 * Parse the request and add some convenience methods
 * to the standard request object
 */
module.exports = function (request, response, handlers) {
    var uri = request.url.replace(/^\//, '');
    
    if (uri.length === 0) {
        request.handler = null;
        request.args = [];
    } else {
        request.segments = uri.split('/');
        request.handler = request.segments[0];
        request.args = request.segments.splice(1);  
        
        if (! handlers[request.handler]) {
            // geo is the default for now, so the handler doesn't come first, just the ip
            request.args = [request.handler];
            request.handler = 'geo';                       
        }
        
        // decode uri components
        for (var i in request.args) {
            request.args[i] = decodeURIComponent(request.args[i]);
        }
        
        request.autoCacheKey = (function() {
            return request.handler + request.args.join('_'); 
        })();
        
        request.quickCacheResponse = function () {
            var ret;
            if (ret = cache.get(this.autoCacheKey)) {
                return ret;
            } else {
                return null;
            }
        }.bind(request);  
        
        request.quickCacheSave = function (data, time) {
            time = time || undefined;
            var ret;
            cache.put(this.autoCacheKey, data, time);                
        }.bind(request);                  
    }        
    
    if (request.handler) {
        request.executeResponse = function (response, complete) {
            if (complete) handlers[request.handler](request, response, complete);
        }
    }
    
    request.cache = cache;
    request.cacheKey = function(base, key) {
        if (Array.isArray(key)) {
            key = key.join('_');    
        }
        
        return base + '_' + key;
    }
    
    return request;
}