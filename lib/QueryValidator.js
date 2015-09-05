var rules = require('./rules')
  , ValidationError = require('./ValidationError')
;

/**
 * Query validator class
 *
 * @class QueryValidator
 * @private
 */
function QueryValidator () {}

/**
 * Validate columns of a query
 *
 * @param {Query} query - Query to validate
 * @throws {ValidationError} Error will be thrown if the query is invalid
 */
QueryValidator.prototype.checkColumns = function(query)
{
  this.checkFrom(query);
  this.checkSelect(query);
  this.checkOrderBy(query);
  this.checkCondition('where', query);
  this.checkCondition('having', query);
}

/**
 * Check `where` or `having` conditions
 *
 * @param {string} param - One of `where` or `having`
 * @param {Query} query - Query to validate
 * @throws {ValidationError}
 */
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

/**
 * Validate order_by parameter
 *
 * @param {Query} query - Query to validate
 * @throws {ValidationError}
 */
QueryValidator.prototype.checkOrderBy = function(query)
{
  if (query.params.order_by) query.params.order_by.forEach(function(col){
    var col = col.split(':');
    if (!this._columnExists(query, col[0])) this._throw('orderBy', 'Unknown column `'+col[0]+'`');
    if (col.length > 1 && ['asc', 'desc'].indexOf(col[1]) < 0) this._throw('orderBy', 'Invalid sort keyword for column `'+col[0]+'`, expected `asc` or `desc`');

  }.bind(this));
}

/**
 * Validate select parameter
 *
 * @param {Query} query - Query to validate
 * @throws {ValidationError}
 */
QueryValidator.prototype.checkSelect = function(query)
{
  if (query.params.select) query.params.select.forEach(function(col){
    if (!this._columnExists(query, col)) this._throw('select', 'Unknown column `'+col+'`');
  }.bind(this));
}

/**
 * Validate mandatory parameters
 *
 * @param {Query} query - Query to validate
 * @throws {ValidationError}
 */
QueryValidator.prototype.checkMandatories = function(query)
{
  if (!this.isString(query.params.token)) this._throw('token', 'Parameter is missing');
  if (!this.isString(query.params.from))  this._throw('from', 'Parameter is missing');
  // subscription_info table doesn't require target and mode
  if ('subscription_info' !== query.params.from) {
    if (!this.isString(query.params.target)) this._throw('target', 'Parameter is missing');
    if (!this.isString(query.params.mode))  this._throw('mode', 'Parameter is missing');
    if (rules.modes.indexOf(query.params.mode) < 0)  this._throw('mode', 'Invalid mode `' + query.params.mode + '`, expected to be one of ' + rules.modes.join(','));
  }
}

/**
 * Validate the from parameter
 *
 * @param {Query} query - Query to validate
 * @throws {ValidationError}
 */
QueryValidator.prototype.checkFrom = function(query) {
  if (!query.params || !query.params.from) this._throw('from', 'Missing parameter');
  var columns = this._getColumnsDefinitions(query);
  if ('undefined' === typeof columns) this._throw('from', 'Invalid value: ' + query.params.from)
}
/**
 * Check if value is a string and is not empty
 *
 * @private
 * @param {mixed} val - Value to test
 * @return {boolean} True if the value is a string, otherwise false
 */
QueryValidator.prototype.isString = function(val) {
  return 'string' === typeof val && val.length > 0;
}

/**
 * Check if a column exists in the query
 *
 * @private
 * @param {Query} query - Query to validate
 * @param {string} column - Column to check
 * @return {array|false} Return the column definition sepecified un the rules.json file or false
 */
QueryValidator.prototype._columnExists = function(query, column)
{
  var columns = this._getColumnsDefinitions(query);
  if (!columns) return false;
  var def = columns[column];
  return 'undefined' !== typeof def ? def : false;
}

/**
 * Get the columns rules of a query
 *
 * @param {Query} query - Query to validate
 * @return {array|undefined} Array of rules
 */
QueryValidator.prototype._getColumnsDefinitions = function(query)
{
  return rules.columns[query.params.from];
}

/**
 * Helper function that throw a ValidationError
 * @throws {ValidationError}
 */
QueryValidator.prototype._throw = function(param, error)
{
  throw new ValidationError(error, param);
}

module.exports = exports = new QueryValidator();
