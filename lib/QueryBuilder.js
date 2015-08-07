var rules = require('./rules')

;
var QueryBuilder = (function(){

  /**
   * Represent a QueryBuilder to send to Ahrefs api
   * @class
   * @param {string} target - Aim of a request: a domain, a directory or a URL
   * @param {object} options - QueryBuilder options
   * @param {boolean} options.validate - Set to false to disable the validation
   */
  function QueryBuilder (options)
  {
    this.params = {
      'where': [],
      'having': [],
      'select': [],
      'order_by': [],
    };
    this.options = { validate: true }

    // merge options
    for (var k in options) { this.options[k] = options[k]; }

    this.setParam('mode', 'exact'); // Default to `exact`
    this.setParam('output', 'json'); // Default to `json`
  }

  QueryBuilder.prototype.select = function()
  {
    return this.setParam('select', this._processArrayOrArgs(arguments));
  }

  QueryBuilder.prototype.order = function()
  {
    return this.setParam('order_by', this._processArrayOrArgs(arguments));
  }

  QueryBuilder.prototype.where = function(operator, column, value)
  {
    return this.setparam('where', [operator, column, value]);
  }

  QueryBuilder.prototype.having = function(operator, column, value)
  {
    return this.setparam('having', [operator, column, value]);
  }

  QueryBuilder.prototype.target = function (target)
  {
    return this.setParam('target', target);
  }

  QueryBuilder.prototype.limit = function(limit)
  {
    return this.setParam('limit', limit);
  }

  QueryBuilder.prototype.offset = function(offset)
  {
    return this.setParam('offset', offset);
  }

  QueryBuilder.prototype.from = function(from)
  {
    return this.setParam('from', from);
  }

  QueryBuilder.prototype.output = function(output)
  {
    return this.setParam('output', output);
  }

  QueryBuilder.prototype.mode = function(mode)
  {
    return this.setParam('mode', mode);
  }

  QueryBuilder.prototype.token = function(token)
  {
    return this.setParam('token', token);
  }

  QueryBuilder.prototype.setParam = function(param, condition) {
    switch (param) {
      case 'limit':
      case 'offset':
      case 'output':
      case 'from':
      case 'target':
      case 'mode':
      case 'token':
        this.params[param] = condition; break;
      case 'where':
      case 'having':
        this.params[param].push(condition); break;
      case 'select':
      case 'order_by':
        this.params[param] = this.params[param].concat(condition); break;
      default:
        throw new Error('Unknown parameter : ' + param);
    }
    return this;
  }

  QueryBuilder.prototype._buildCondition = function(operator, column, value)
  {
    if (rules.operators[operator]) {
      value = this._wrapValue(value, column);
      return column + rules.operators[operator] + value;
    } else {
      value = this._wrapValue(value, operator);
      return  operator + "(" + column + "," + value+ ")";
    }
  }

  QueryBuilder.prototype._wrapValue = function(value, type)
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

  QueryBuilder.prototype._quote = function(value)
  {
    value = (value + '')
      .replace(/[\\"']/g, '\\$&')
      .replace(/\u0000/g, '\\0');
    return '"' + value + '"';
  }

  QueryBuilder.prototype._processArrayOrArgs = function(arguments)
  {
    var args = Array.prototype.slice.call(arguments);
    if (1 === args.length && 'object' === typeof args[0]) args = args[0];
    return args;
  }

  return QueryBuilder;
})();

module.exports = exports = QueryBuilder;
