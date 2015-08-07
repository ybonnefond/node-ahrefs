var rules = require('./rules')

;

var QueryValidator = (function(){
  function QueryValidator () {}

  QueryValidator.prototype.validate = function(query)
  {
    this.checkMandatories(query);
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
      if (!this._columnExists(query, col)) this._throw('order', 'Unknown column `'+col+'`');

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
    rules.mandatories.forEach(function(param){
      if ('string' !== typeof query.params[param] || query.params[param].length === 0) errors.push(param);
    });
    if (errors.length > 0) throw new Error ('The following parameters are missing : ' + errors.join(', '));
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
