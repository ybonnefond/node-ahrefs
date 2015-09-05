var Query = require('./Query')
  , validator = require('./QueryValidator')
  , encoder = require('./UrlEncoder')
  , request = require('request')
  , xmlParser = require('xml2js').parseString
  , ValidationError = require('./ValidationError')
;

/**
 * Define a callback called on response
 * @callback responseCallback
 * @param {Error|null} err        - Error thrown during the request, null if the request has been executed correctly
 * @param {object|null} result    - Results return by the api or null if there is an error
 */

/**
 * Create a new Ahrefs instance
 *
 * @class Ahrefs
 * @param {object} options - List of options
 * @param {string} options.token - Ahrefs Token
 * @param {string} [options.url] - Ahrefs API url. Default: 'http://apiv2.ahrefs.com/'
 * @param {boolean} [options.validate] - Set to false to disable parameter validation. Default: true.
 */
function Ahrefs (options) {

  /**
   * @member {ValidationError} ValidationError - Error class that will be thrown during the validation process
   */
  this.ValidationError = ValidationError;

  this.options = {
    token: '',
    url: 'http://apiv2.ahrefs.com/',
    validate: true
  };

  for (var k in options) { this.options[k] = options[k]; }

  if ('string' != typeof this.options.token || 0 <= this.options.token) throw new Error('API Token is required');
}

/**
 * Get a Query instance
 *
 * @return {Query}
 */
Ahrefs.prototype.newQuery = function(){
  var q = new Query();
  q.token(this.options.token);
  return q;
}

/**
 * Perform a GET request
 *
 * @param {Query} query - Query to execute
 * @param {responseCallback} callback - Callback called on error or when received a response from the API
 * @throws {ValidationError}
 */
Ahrefs.prototype.get = function(query, callback){
  this._exec(query, callback);
}

/**
 * Perform a POST request
 *
 * @param {Query} query - Query to execute
 * @param {responseCallback} callback - Callback called on error or when received a response from the API
 * @throws {ValidationError}
 */
Ahrefs.prototype.post = function(query, callback){
  this._exec(query, callback, 'POST');
}


/**
 * Perform a request
 *
 * @private
 * @param {Query} query - Query to execute
 * @param {responseCallback} callback - Callback called on error or when received a response from the API
 * @method {string} [method] - Request method. One of `GET` or `POST`. Default: `GET`
 * @throws {ValidationError} Will throw an error if validation is active and query is invalid
 */
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

/**
 * Parse a json response
 *
 * @private
 * @param {string} body - Response body
 * @param {responseCallback} callback - Callback called on error or when received a response from the API
 */
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

/**
 * Parse a XML response
 *
 * @private
 * @param {string} body - Response body
 * @param {responseCallback} callback - Callback called on error or when received a response from the API
 */
Ahrefs.prototype._handleXmlResponse = function(body, callback) {
  xmlParser(body, function(err, result){
    if (err) callback(err);
    else {
      if (result.AhrefsApiResponse && result.AhrefsApiResponse.error) callback(result.AhrefsApiResponse.error);
      else callback(null, body);
    }
  })
}

module.exports = exports = function(config) {
  return new Ahrefs(config);
};
