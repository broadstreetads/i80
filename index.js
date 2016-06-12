var http     = require('http'),
    prepReq  = require('./lib/prep-req'),
    prepRes  = require('./lib/prep-res');

module.exports = (function() {

    var public = {};

    public.start = function (options) {

        var server = http.createServer(function (req, res) {
            res = prepRes(req, res);
            req = prepReq(req, res, options.handlers); 
                
            var response = null, code = 200, complete = function(response) {
                res.end(JSON.stringify(response));      
            };
            
            // executeResponse only exists if we can handle the request
            // and we have everything we need to do so. It comes from
            // prepReq
            if (req.executeResponse) {
                req.executeResponse(res, complete);
            } else {
                code = 404;
                response = {status: 404, description: 'maybe its because im irish'}
                complete(response);
            }
        });

        //Lets start our server
        server.listen(options.port, function() {
            console.log("Server listening on: http://localhost:%s", options.port);
        });
    }

    return public;
})()