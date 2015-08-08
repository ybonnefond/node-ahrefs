var rules = require('./rules')
  , Query = require('./Query')
  , validator = require('./QueryValidator')
  , encoder = require('./UrlEncoder')
  , request = require('request')
  , xmlParser = require('xml2js').parseString;
;



var Ahrefs = (function(){
  function Ahrefs (options) {

    this.options = {
      token: '',
      url: 'http://apiv2.ahrefs.com/',
      validate: true
    };

    for (var k in options) { this.options[k] = options[k]; }

    if ('string' != typeof this.options.token || 0 <= this.options.token) throw new Error('API Token is required');
  }

  /**
   * Get a request builder
   * @return RequestBuilder
   */
  Ahrefs.prototype.newQuery = function(){
    var q = new Query();
    q.token(this.options.token);
    return q;
  }

  Ahrefs.prototype.get = function(query, callback){
    this._exec(query, callback);
  }

  Ahrefs.prototype.post = function(query, callback){
    this._exec(query, callback, 'POST');
  }

  Ahrefs.prototype._exec = function(query, callback, method) {
    var self = this;
    if ('undefined' === typeof method) method = 'GET';
    // Throw Error if the mandatory fields are not set
    if (!query.params.from) throw new Error('Missing `from` parameter');

    // No need to check for mandatory for subscription_info
    if('subscription_info' !== query.params.from) validator.checkMandatories(query);

    // Deeper column validation if requried
    if (this.options.validate) validator.checkColumns(query);
    // Run the query
    request({
      url: this.options.url + '?' + encoder.encodeParams(query.params),
      method: method
    }, function(err, response, body){
      if (err) return callback(err);

      if ('json' === query.params.output) self._handleJsonResponse(body, callback);
      else self._handleXmlResponse(body, callback);
    })
  }

  Ahrefs.prototype._handleJsonResponse = function(body, callback) {
    var err = null;
    try {
      body = JSON.parse(body);
      if (body.error) {
        err = body.error;
        body = null;
      };
    } catch (e) {
      err = e;
      body = null;
    }
    callback(err, body);
  }

  Ahrefs.prototype._handleXmlResponse = function(body, callback) {
    xmlParser(body, function(err, result){
      if (err) callback(err);
      else {
        if (result.AhrefsApiResponse && result.AhrefsApiResponse.error) callback(result.AhrefsApiResponse.error);
        else callback(null, body);
      }
    })
  }

  return Ahrefs
})();



module.exports = exports = function(config) {
  return new Ahrefs(config);
};
