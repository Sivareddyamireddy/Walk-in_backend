const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    company: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
