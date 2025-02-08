const path = require('path');  // ✅ Import path module
const Company = require('../models/Company');
const User = require('../models/User');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // ✅ Use lowercase 'path'
    }
});

const upload = multer({ storage: storage });


const addCompany = async (req, res) => {
    try {
        const { companyName, location, category, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user already has a company (using single reference instead of array)
        if (user.company) {
            return res.status(400).json({ message: "User can have only one company" });
        }

        // Create the new company
        const company = new Company({
            companyName,
            location,
            category,
            description,
            image,
            user: user.id
        });

        // Save the company
        const savedCompany = await company.save();

        // Assign the company reference to the user (single reference, not array)
        user.company = savedCompany._id;
        await user.save();

        // Return success response with companyId
        res.status(201).json({ message: "Company registered successfully", companyId: savedCompany._id });
        console.log("Company added successfully");

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



const deleteCompanyById = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const deleteCompany = await Company.findByIdAndDelete(companyId);
        
        if (!deleteCompany) {
            return res.status(404).json({ error: "No Company found" });
        }

        return res.status(200).json({ message: "Company deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    addCompany: [upload.single('image'), addCompany], 
    deleteCompanyById
};
