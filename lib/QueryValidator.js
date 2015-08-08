var rules = require('./rules')

;

var QueryValidator = (function(){
  function QueryValidator () {}

  QueryValidator.prototype.checkColumns = function(query)
  {
    this.checkSelect(query);
    this.checkOrderBy(query);
    this.checkCondition('where', query);
    this.checkCondition('having', query);
  }

  QueryValidator.prototype.checkCondition = function(param, query)
  {
    if (query.params[param]) query.params[param].forEach(function(col){
      // col[0] => operator
      // col[1] => column
      // col[2] => value
      var def = this._columnExists(query, col[1]);
      if (!def) this._throw(param, 'Unknown column `'+col[1]+'`');

      var pos = 'where' === param ? 1 : 2;

      if (!def[pos]) this._throw(param, 'Column `' + col + '` cannot be used in `'+param+'` condition')
    }.bind(this));
  }

  QueryValidator.prototype.checkOrderBy = function(query)
  {
    if (query.params.order_by) query.params.order_by.forEach(function(col){
      var col = col.split(':');
      if (!this._columnExists(query, col[0])) this._throw('orderBy', 'Unknown column `'+col[0]+'`');
      if (col.length > 1 && ['asc', 'desc'].indexOf(col[1]) < 0) this._throw('orderBy', 'Invalid sort keyword for column `'+col[0]+'`, expected `asc` or `desc`');

    }.bind(this));
  }

  QueryValidator.prototype.checkSelect = function(query)
  {
    if (query.params.select) query.params.select.forEach(function(col){
      if (!this._columnExists(query, col)) this._throw('select', 'Unknown column `'+col+'`');
    }.bind(this));
  }

  QueryValidator.prototype.checkMandatories = function(query)
  {
    var errors = [];
    if (!this.isString(query.params.token)) this._throw('token', 'Parameter is missing');
    if (!this.isString(query.params.from))  this._throw('from', 'Parameter is missing');
    // subscription_info table doesn't require target and mode
    if ('subscription_info' !== query.params.from) {
      if (!this.isString(query.params.target)) this._throw('target', 'Parameter is missing');
      if (!this.isString(query.params.mode))  this._throw('mode', 'Parameter is missing');
      if (rules.modes.indexOf(query.params.mode) < 0)  this._throw('mode', 'Invalid mode `' + query.params.mode + '`, expected to be one of ' + rules.modes.join(','));
    }
    if (errors.length > 0) throw new Error ('The following parameters are missing : ' + errors.join(', '));
  }

  QueryValidator.prototype.isString = function(val) {
    return 'string' === typeof val && val.length > 0;
  }

  QueryValidator.prototype._columnExists = function(query, column)
  {
    return this._getColumnsDefinitions(query)[column];
  }

  QueryValidator.prototype._getColumnsDefinitions = function(query)
  {
    return rules.columns[query.params.from];
  }

  QueryValidator.prototype._throw = function(param, error)
  {
    throw new Error(param + ': ' + error);
  }

  return QueryValidator;
})();

module.exports = exports = new QueryValidator();
