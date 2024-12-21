const jobpostingController = require('../controllers/jobpostingContoller');
const express = require('express');

const router = express.Router();

router.post('/add-jobpost/:companyId', jobpostingController.addJobposting);
router.get('/:companyId/jobpostings', jobpostingController.getJobpostingByCompany);
router.delete('/delete-jobpost/:jobpostingId', jobpostingController.deleteJobpostingById);

module.exports = router;