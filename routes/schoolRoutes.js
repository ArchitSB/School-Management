// routes/schoolRoutes.js
const express = require('express');
const schoolController = require('../controllers/schoolController');
const { addSchoolValidationRules, listSchoolsValidationRules, validate } = require('../middleware/validation');

const router = express.Router();


// POST /api/schools/addSchool
router.post(
    '/addSchool',
    addSchoolValidationRules(),
    validate,
    schoolController.addSchool
);

// GET /api/schools/listSchools?latitude=USER_LAT&longitude=USER_LON
router.get(
    '/listSchools',
    listSchoolsValidationRules(),
    validate,
    schoolController.listSchools
);


module.exports = router;