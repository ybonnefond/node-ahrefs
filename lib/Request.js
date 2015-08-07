var rules = require('./rules')

;
var Request = (function(){

  /**
   * Represent a request to send to Ahrefs api
   * @class
   * @property {string} target - Aim of a request: a domain, a directory or a URL
   * @property {string} mode - Mode of operation: exact, domain, subdomains or prefix
   * @property {object} params - Array of parameters to be sent
   * @property {object} oriParams -
   * @property {boolean} isPrepare - is it _get or _prepare call
   */
  function Request (target, mode) {

    if ('string' !== typeof target || target.length <= 0) throw new Error('Missing target');
    this.target = target;

    this.mode = mode || rules.modes[0]; // Default to `exact`

    this.params = {};
    this.oriParams = {
      'where': [],
      'having': []
    };
    this.isPrepare = false;
  }

  /**
   * Validate the colums
   * @function checkColumns
   * @this {AhrefsRequest}
   * @return {Array} Array of errors
   */
  Request.prototype.checkColumns = function() {

  }

  Request.prototype.where = function(operator, column, value) {

  }

  Request.prototype.having = function(operator, column, value) {

  }

  Request.prototype.setLimit = function(limit) {
    this.target = target;
  }

  Request.prototype.setParam = function(param, condition) {

  }

  Request.prototype.wrapValue = function(value, type) {

    if (rules.quotedValue.indexOf(type) >= 0 ) return this.quote(value);

    for (var col in rules.columns){
      var val = rules.columns[col];
      if (val.hasOwnProperty(type)) {
        switch(val[type][0]) {
          case 'string':
          case 'date': return this.quote(value);
          case 'boolean': return value ? 'true': 'false';
          default: return value;
        }
      }
    };
    return value;
  }

  Request.prototype.quote = function(value) {
    value = (value + '')
      .replace(/[\\"']/g, '\\$&')
      .replace(/\u0000/g, '\\0');
    return '"' + value + '"';
  }

  return Request;
})();

module.exports = exports = Request;
