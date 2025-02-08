// const userSchema = new mongoose.Schema({
//     username: { 
//         type: String, 
//         required: true 
//     },
//     email: { 
//         type: String, 
//         required: true, 
//         unique: true 
//     },
//     password: { 
//         type: String, 
//         required: true 
//     },
//     company: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Company'
//         }
//     ]
// });
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
    company: { // Changed to a single company reference
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        unique: true, // Enforce uniqueness
        default: null // Default to null if no company
    }
});

module.exports = mongoose.model('User', userSchema);
