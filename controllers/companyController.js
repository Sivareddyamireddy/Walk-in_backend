const Company = require('../models/Company');
const User = require('../models/User');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Directory where files will be stored
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + Path.extname(file.originalname) ); // Rename file to avoid duplicates
//     }
//   });

  // const upload = multer({ storage : storage});

const addCompany = async(req, res)=>{
    try {
        const {companyName, location, category, description} = req.body;
    
        // const image = req.file?req.file.filename: undefined;
        
        const user = await User.findById(req.userId);
    
        if(!user){
            return req.status(404).json({message:"User not found"})
        }
    
        const company = new Company({
            companyName, 
            location, 
            category, 
            description, 
            // image, 
            user: user.id
        })
        
        const savedCompany = await company.save();
       
        user.company.push(savedCompany)

        await user.save()

        return res.status(200).json({message: "Company registered successfully"});

   } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal server error"})
   }
}
const deleteCompanyById = async(req, res)=>{
    try {
        const companyId = req.params.companyId;

        const deleteCompany = await Company.findByIdAndDelete(companyId);
        
        if(!deleteCompany){
            return res.status(404).json({error:"No Company found"});
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal server error"})
    }
}


module.exports = {addCompany, deleteCompanyById};
// module.exports={addCompany: [upload.single('image'), addCompany]};