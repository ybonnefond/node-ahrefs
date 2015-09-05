'use strict';

/**
 * Error thrown during validation
 *
 * ```javascript
 * try {
 *   ahrefs.get(query, function(err){
 *     if (err instanceof ahrefs.ValidationError) {
 *        // Handle validation error
 *     }
 *   })
 * }
 * ```
 * @class ValidationError
 */
function ValidationError(message, param) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = param + ' : ' + message;
  this.param = param;
};

require('util').inherits(ValidationError, Error);

module.exports = exports = ValidationError;
