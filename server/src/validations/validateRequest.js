// src/validations/validateRequest.js
module.exports = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // validate
    next();
  } catch (err) {

    const errors = Array.isArray(err.issues)
      ? err.issues.map(e => e.message)
      : [err.message || "Validation failed"];

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }
};
