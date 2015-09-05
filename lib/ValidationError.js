'use strict';

function ValidationError(message, param) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = param + ' : ' + message;
  this.param = param;
};

require('util').inherits(ValidationError, Error);

module.exports = exports = ValidationError;
