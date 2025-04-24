// middleware/validation.js
const { check, validationResult } = require('express-validator');

// Validation rules for adding a school
const addSchoolValidationRules = () => {
  return [
    // name must not be empty
    check('name')
        .trim()
        .notEmpty().withMessage('School name is required.')
        .isLength({ min: 2 }).withMessage('School name must be at least 2 characters long.'),

    // address must not be empty
    check('address')
        .trim()
        .notEmpty().withMessage('Address is required.')
        .isLength({ min: 5 }).withMessage('Address must be at least 5 characters long.'),

    // latitude must be a valid float
    check('latitude')
        .notEmpty().withMessage('Latitude is required.')
        .isFloat().withMessage('Latitude must be a valid number.')
        .toFloat(), // Convert to float

    // longitude must be a valid float
    check('longitude')
        .notEmpty().withMessage('Longitude is required.')
        .isFloat().withMessage('Longitude must be a valid number.')
        .toFloat() // Convert to float
  ];
};

// Middleware function to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); // Proceed to the controller if no errors
  }

  // Collect error messages
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param || 'error']: err.msg })); // Adjust err.param to err.path if using newer versions

  // Return 400 Bad Request with validation errors
  return res.status(400).json({
    errors: extractedErrors,
  });
};

// Validation rules for listing schools (query parameters)
const listSchoolsValidationRules = () => {
    return [
        check('latitude')
            .notEmpty().withMessage('User latitude query parameter is required.')
            .isFloat().withMessage('User latitude must be a valid number.')
            .toFloat(),
        check('longitude')
            .notEmpty().withMessage('User longitude query parameter is required.')
            .isFloat().withMessage('User longitude must be a valid number.')
            .toFloat()
    ];
};


module.exports = {
  addSchoolValidationRules,
  listSchoolsValidationRules,
  validate,
};