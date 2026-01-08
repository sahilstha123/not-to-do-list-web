// src/validations/validateRequest.js
module.exports = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // validate
    next();
  } catch (err) {

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.flatten()
    });
  }
};
