var url = require('url');

/**
 * Set up the response with some global options/properties
 */
module.exports = function(req, res) {
    // CORS (event tracking, etc)
    var h;

    if (!req.headers.referer) {
      h = '*'; // works on some browsers, not on others
    } else {
      h = url.parse(req.headers.referer, true).host;
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || h);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Request-Method', '*');  
    
    return res;  
}