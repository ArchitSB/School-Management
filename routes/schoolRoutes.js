// routes/schoolRoutes.js
const express = require('express');
const schoolController = require('../controllers/schoolController');
const { addSchoolValidationRules, listSchoolsValidationRules, validate } = require('../middleware/validation');

const router = express.Router();

// Route to add a new school
// POST /api/schools/addSchool
// Applies validation rules first, then the controller logic
router.post(
    '/addSchool',
    addSchoolValidationRules(), // Define the rules
    validate,                   // Execute the validation check
    schoolController.addSchool  // Proceed to controller if valid
);

// Route to list schools sorted by proximity
// GET /api/schools/listSchools?latitude=USER_LAT&longitude=USER_LON
router.get(
    '/listSchools',
    listSchoolsValidationRules(), // Define query param rules
    validate,                     // Execute validation
    schoolController.listSchools  // Proceed to controller
);


module.exports = router;