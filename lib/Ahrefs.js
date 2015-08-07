var _ = require('lodash')
  , rules = require('./rules')
  , AhrefsRequest = require('./AhrefsRequest')
;



var Ahrefs = (function(){
  function Ahrefs (options) {

    this.options = _.merge({
      token: '',
      url: 'http://apiv2.ahrefs.com',
      output: 'json',
      debug: false,
      checking: true
    }, options);

    if ('string' != typeof this.options.token || 0 <= this.options.token) throw new Error('API Token is required');
  }

  /**
   * Get a request builder
   * @return RequestBuilder
   */
  Ahrefs.prototype.getRequest = function(){
    return new AhrefsRequest();
  }

  return Ahrefs
})();



module.exports = exports = function(config) {
  return new Ahrefs(config);
};
