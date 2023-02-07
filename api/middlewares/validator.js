const { validationResult } = require("express-validator");
const { BadRequestError } = require("../utils/app-errors");

// sequential processing, stops running validations chain if the previous one have failed.
module.exports = (validations) => async (req, res, next) => {
  for (const validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  console.error(errors.array());

  const { msg } = errors.array()[0];

  next(new BadRequestError(msg));
};
