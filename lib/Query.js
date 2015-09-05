var Query = (function(){

  /**
   * Represent a Query to send to Ahrefs api
   * @class Query
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

  /**
   * Set the select parameter.
   *
   * Can be either a column name or an array of columns
   *
   * @param {string|string[]} select - Column(s) to select
   */
  Query.prototype.select = function()
  {
    return this.setParam('select', this._processArrayOrArgs(arguments));
  }

  /**
   * Set the order_by parameter.
   *
   * Can be either a column name or an array of columns
   *
   * @param {string|string[]} select - Column(s) to order by
   */
  Query.prototype.orderBy = function()
  {
    return this.setParam('order_by', this._processArrayOrArgs(arguments));
  }

  /**
   * Add a where clause.
   *
   * This method can be called multiple times
   *
   * @param {string} operator - One of ["eq","ne","lt", "gt", "lte", "gte", "substring","word","subdomain"]
   * @param {string} column - Column to set the where condition on
   * @param {mixed} value - Where condition value
   */
  Query.prototype.where = function(operator, column, value)
  {
    return this.setParam('where', [operator, column, value]);
  }

  /**
   * Add a having clause.
   *
   * This method can be called multiple times
   *
   * @param {string} operator - One of ["eq","ne","lt", "gt", "lte", "gte", "substring","word","subdomain"]
   * @param {string} column - Column to set the having condition on
   * @param {mixed} value - Having condition value
   */
  Query.prototype.having = function(operator, column, value)
  {
    return this.setParam('having', [operator, column, value]);
  }

  /**
   * Set the target parameter
   *
   * @param {string} target - Request target. E.g. an url
   */
  Query.prototype.target = function (target)
  {
    return this.setParam('target', target);
  }

  /**
   * Set the limit parameter
   *
   * @param {integer} limit - Number of results to return
   */
  Query.prototype.limit = function(limit)
  {
    return this.setParam('limit', limit);
  }

  /**
   * Set the offset parameter
   *
   * @param {integer} offset - Position from which to start returning data
   */
  Query.prototype.offset = function(offset)
  {
    return this.setParam('offset', offset);
  }

  /**
   * Set the from parameter
   *
   * @param {string} from - Table to select data from
   */
  Query.prototype.from = function(from)
  {
    return this.setParam('from', from);
  }

  /**
   * Set the output parameter
   *
   * @param {string} output - Output format. One of xml or json
   */
  Query.prototype.output = function(output)
  {
    return this.setParam('output', output);
  }

  /**
   * Set the mode parameter
   *
   * @param {string} mode - Mode of operation: exact, domain, subdomains or prefix
   */
  Query.prototype.mode = function(mode)
  {
    return this.setParam('mode', mode);
  }

  /**
   * Set the token parameter
   *
   * This method is called by the Ahrefs class  when executing the query
   *
   * @private
   * @param {string} token - Mode of operation: exact, domain, subdomains or prefix
   */
  Query.prototype.token = function(token)
  {
    return this.setParam('token', token);
  }

  /**
   * Set a parameter
   *
   * @private
   * @param {string} param - Parameter name
   * @param {mixed} value - Value of the parameter
   */
  Query.prototype.setParam = function(param, value) {
    switch (param) {
      case 'limit':
      case 'offset':
      case 'output':
      case 'from':
      case 'target':
      case 'mode':
      case 'token':
        this.params[param] = value; break;
      case 'where':
      case 'having':
        this.params[param].push(value); break;
      case 'select':
      case 'order_by':
        this.params[param] = this.params[param].concat(value); break;
      default:
        throw new Error('Unknown parameter : ' + param);
    }
    return this;
  }

  /**
   * Utility method that converts arguments to an array
   * or return the first arguments if it is an array.
   *
   * This method is used for by setters that accept string or arrays. 
   *
   * @private
   * @param {arguments} arguments - A javascript arguments variable
   */
  Query.prototype._processArrayOrArgs = function(arguments)
  {
    var args = Array.prototype.slice.call(arguments);
    if (1 === args.length && 'object' === typeof args[0]) args = args[0];
    return args;
  }

  return Query;
})();

module.exports = exports = Query;
