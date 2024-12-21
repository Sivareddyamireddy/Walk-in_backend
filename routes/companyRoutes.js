const companyController = require('../controllers/companyController');
const express = require('express');
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router();

router.post('/add-company', verifyToken, companyController.addCompany);
router.delete('/delete-company/:companyId', companyController.deleteCompanyById);

// router.get('/uploads/:imageName', (req,res)=>{
//     const imageName = req.params.imageName;
//     res.headersSent('Content-Type', 'image/jpeg');
//     res.sendFile(Path2D.join(__dirname, '..', 'uploads', imageName));
// })

module.exports = router;