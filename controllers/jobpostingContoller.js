const Jobposting = require('../models/Jobposting');
const Company = require('../models/Company')

const addJobposting  = async(req, res)=>{
    try {
        const {jobRole, eligibility, skillsRequired, hiringDate, experience, ctc, interviewLocation, noOfOpenings, shifts} = req.body;
        
        const companyId = req.params.companyId;
        const company = await Company.findById(companyId);

        if(!company){
            return res.status(404).json({error:"No company found"});
        }

        const jobposting = new Jobposting({
            jobRole, 
            eligibility, 
            skillsRequired, 
            hiringDate, 
            experience, 
            ctc,
            interviewLocation, 
            noOfOpenings,
            shifts,
            company: company._id

        })

        const savedJobposting = await jobposting.save();

        company.jobpostings.push(savedJobposting);
        
        await company.save();

        return res.status(200).json({message: "Job-posting added successfully"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal server error"})
        
    }
}

const getJobpostingByCompany = async(req, res)=>{
    try {
        const companyId = req.params.companyId;
        const company = await Company.findById(companyId);

        if(!company){
            return res.status(404).json({error:"No company found"});
        }

        const companyName = company.companyName;

        const jobpostings = await Jobposting.find({company: companyId});

        res.status(200).json({companyName, jobpostings});

    } catch (error) {     
        console.error(error);
        return res.status(500).json({error:"Internal server error"})
    }
}

const deleteJobpostingById = async(req, res)=>{
    try {
        const jobpostingId = req.params.jobpostingId;

        const deleteJobposting = await Jobposting.findByIdAndDelete(jobpostingId);
        
        if(!deleteJobposting){
            return res.status(404).json({error:"No Job-post found"});
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal server error"})
    }
}

module.exports = {addJobposting, getJobpostingByCompany, deleteJobpostingById}