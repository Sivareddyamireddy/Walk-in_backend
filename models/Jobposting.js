const mongoose = require('mongoose');

const jobpostingSchema = new mongoose.Schema({
    jobRole: {
        type: String,
        required: [true, 'Job Role is required'],
        trim: true
    },  
    eligibility: {
        type: String,
        required: [true, 'Eligibility is required']
    },  
    skillsRequired: {
        type: [String], // Array of skills
        required: [true, 'Skills are required']
    }, 
    hiringDate: {
        type: Date,
        required: [true, 'Hiring Date is required']
    }, 
    experience: {
        type: String,
        required: [true, 'Experience is required']
    }, 
    interviewLocation: {
        type: String,
        required: [true, 'Interview Location is required']
    }, 
    ctc: {
        type: String,
        required: [true, 'CTC is required']
    }, 
    noOfOpenings: {
        type: Number,
        required: [true, 'Number of Openings is required'],
        min: [1, 'At least one opening is required']
    }, 
    shift: {
        type: String,
        required: [true, 'Shifts information is required'],

    },
    company : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Company'
        }
    ]
});


module.exports = mongoose.model('Jobposting', jobpostingSchema);