const mongoose = require('mongoose');
const Jobposting = require('./Jobposting');

const companySchema = new mongoose.Schema({
    companyName: {
        type : String,
        required : [true, 'Company name is required'],
        unique : true,
        trim: true
    },
    location : {
        type: String, 
        required: [true, 'Location is required']
    },
    category : {
        type : [
            {
                type : String,
                //enum : ['IT', 'NON-IT']
                required: [true, 'Category is required']
            },
        ],
    },
    description: { 
        type: String,
        trim: true
    },
    // image: {
    //     type : String
    // },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    jobpostings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Jobposting'
        }
    ]
});

module.exports = mongoose.model('Company', companySchema);