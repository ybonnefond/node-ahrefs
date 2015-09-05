var validator = require('./QueryValidator')
  , rules = validator.rules
;

/**
 * Condition
 * condition[0] : operator
 * condition[1] : Column
 * condition[2]: value
 * @typedef {array} UrlEncoder~condition
 */

/**
 * Utility class to help encode url from a Query
 * @class UrlEncoder
 * @private
 */
function UrlEncoder(){ }

/**
 * Encode parameters and build a query String
 * @param {object} params - Object containing the parameters to encode
 */
UrlEncoder.prototype.encodeParams = function(params) {
  var self = this;
  var components = [];
  for (var key in params) {
    var value = params[key];
    switch(key) {
      case 'select':
      case 'order_by': value = this.encodeArray(value); break;
      case 'where':
      case 'having':
        value = this.encodeCondition(value); break;
    }
    if ('' !== value) components.push(key + '=' + encodeURIComponent(value));
  }
  return components.join('&');
}

/**
 * Encode an array of value.
 * This method simply join values with ','
 * @param {array} values - Jalues to join
 * @return {string} Url encoded array
 */
UrlEncoder.prototype.encodeArray = function(values){
  return values.join(',');
}

/**
 * Encode a condition (where or having)
 * @param {UrlEncoder~condition[]} values - Array of where or having conditions ({ operator: 'xxx', column: 'xxx', value: 'xxx'})
 * @return {string} Url encoded conditions
 */
UrlEncoder.prototype.encodeCondition = function(values){
  var self = this;
  return values
    .map(self._buildCondition.bind(self))
    .join(',');
}

/**
 * URL Encode a condition
 * @private
 * @param {UrlEncoder~condition} condition - Condition to encode
 * @return {string} Encoded condition
 */
UrlEncoder.prototype._buildCondition = function(condition)
{
  if ('object' !== typeof condition || !condition.length || 3 !== condition.length) throw new Error('Invalid condition : ' + String(condition))
  var operator = condition[0];
  var column = condition[1];
  var value = condition[2];
  if (rules.operators[operator]) {
    value = this._wrapValue(value, column);
    return column + rules.operators[operator] + value;
  } else {
    value = this._wrapValue(value, operator);
    return  operator + "(" + column + "," + value+ ")";
  }
}

/**
 * Add quote to a value
 * @private
 * @param {string} value - Value to process
 * @param {string} type - Typeof od the value
 * @return {string}
 */
UrlEncoder.prototype._wrapValue = function(value, type)
{
  if (rules.quotedValue.indexOf(type) >= 0 ) return this._quote(value);

  for (var col in rules.columns){
    var val = rules.columns[col];
    if (val.hasOwnProperty(type)) {
      switch(val[type][0]) {
        case 'string':
        case 'date': return this._quote(value);
        case 'boolean': return value ? 'true': 'false';
        default: return value;
      }
    }
  };
  return value;
}

/**
 * escape quotes if exists and surround value with quotes
 * @private
 * @param {string} value - Value to process
 * @return {string} Quoted value
 */
UrlEncoder.prototype._quote = function(value)
{
  value = (value + '')
    .replace(/[\\"']/g, '\\$&')
    .replace(/\u0000/g, '\\0');
  return '"' + value + '"';
}

module.exports = exports = new UrlEncoder();
