var Query = (function(){

  /**
   * Represent a Query to send to Ahrefs api
   * @class
   * @param {string} target - Aim of a request: a domain, a directory or a URL
   * @param {object} options - Query options
   * @param {boolean} options.validate - Set to false to disable the validation
   */
  function Query ()
  {
    this.params = {
      'where': [],
      'having': [],
      'select': [],
      'order_by': [],
    };

    this.setParam('mode', 'exact'); // Default to `exact`
    this.setParam('output', 'json'); // Default to `json`
  }

  Query.prototype.select = function()
  {
    return this.setParam('select', this._processArrayOrArgs(arguments));
  }

  Query.prototype.orderBy = function()
  {
    return this.setParam('order_by', this._processArrayOrArgs(arguments));
  }

  Query.prototype.where = function(operator, column, value)
  {
    return this.setParam('where', [operator, column, value]);
  }

  Query.prototype.having = function(operator, column, value)
  {
    return this.setParam('having', [operator, column, value]);
  }

  Query.prototype.target = function (target)
  {
    return this.setParam('target', target);
  }

  Query.prototype.limit = function(limit)
  {
    return this.setParam('limit', limit);
  }

  Query.prototype.offset = function(offset)
  {
    return this.setParam('offset', offset);
  }

  Query.prototype.from = function(from)
  {
    return this.setParam('from', from);
  }

  Query.prototype.output = function(output)
  {
    return this.setParam('output', output);
  }

  Query.prototype.mode = function(mode)
  {
    return this.setParam('mode', mode);
  }

  Query.prototype.token = function(token)
  {
    return this.setParam('token', token);
  }

  Query.prototype.setParam = function(param, condition) {
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

  Query.prototype._processArrayOrArgs = function(arguments)
  {
    var args = Array.prototype.slice.call(arguments);
    if (1 === args.length && 'object' === typeof args[0]) args = args[0];
    return args;
  }

  return Query;
})();

module.exports = exports = Query;
