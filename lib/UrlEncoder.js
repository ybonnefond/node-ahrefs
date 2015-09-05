var validator = require('./QueryValidator')
  , rules = validator.rules
;

function UrlEncoder(){ }

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

UrlEncoder.prototype.encodeArray = function(values){
  return values.join(',');
}

UrlEncoder.prototype.encodeCondition = function(values){
  var self = this;
  return values
    .map(self._buildCondition.bind(self))
    .join(',');
}

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

UrlEncoder.prototype._quote = function(value)
{
  value = (value + '')
    .replace(/[\\"']/g, '\\$&')
    .replace(/\u0000/g, '\\0');
  return '"' + value + '"';
}

module.exports = exports = new UrlEncoder();
