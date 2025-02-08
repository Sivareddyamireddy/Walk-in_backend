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
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);

    // Set Correct Header
    res.setHeader('Content-Type', 'image/jpeg'); 
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).json({ error: "Image not found" });
        }
    });
});

module.exports = router;