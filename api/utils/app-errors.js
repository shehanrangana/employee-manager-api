const { STATUS_CODES } = require("./enums");

class BaseError extends Error {
  constructor(message, statusCode) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

// 400 error
class BadRequestError extends BaseError {
  constructor(message = "Bad request") {
    super(message, STATUS_CODES.BAD_REQUEST);
  }
}

// 404 error
class NotFoundError extends BaseError {
  constructor(message = "Not found") {
    super(message, STATUS_CODES.NOT_FOUND);
  }
}

// 409 error
class ConflictError extends BaseError {
  constructor(message = "Conflict") {
    super(message, STATUS_CODES.CONFLICT);
  }
}

// 500 error
class InternalServerError extends BaseError {
  constructor(message = "Internal server error") {
    super(message, STATUS_CODES.INTERNAL_ERROR);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
