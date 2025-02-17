const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhatIsYourName

const userRegister = async(req, res)=>{
    const { username, email, password } = req.body;

    try {
        const userEmail = await User.findOne({email})
        if(userEmail){
            return res.status(404).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
        console.log("registered")

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
}

const userLogin = async(req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error:"Invalid username or password"});
        }

        const token = jwt.sign({userId: user._id}, secretKey, {expiresIn:"1h"})

        const userId = user._id;


        res.status(200).json({message: "Login successfully", token, userId });
        console.log(email, "this is token", token);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
}

const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find().populate('company');
        res.json({users})
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
}

// const getUserById = async(req, res)=>{
//     const userId = req.params.id;
//     try {
//         const user = await User.findById(userId).populate('company');
//         if(!user){
//             return res.status(404).json({error:"user not found"})
//         }
//         const userCompanyId = user.company[0]._id;
//         res.status(200).json({userCompanyId})
//         console.log(userCompanyId);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({error:"Internal server error"})
//     }
// }

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).populate('company');

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Ensure 'company' exists and is an array with at least one entry
        if (!user.company || !Array.isArray(user.company) || user.company.length === 0) {
            return res.status(404).json({ error: "Company details not found for this user" });
        }

        const userCompanyId = user.company[0]._id;
        res.status(200).json({ userCompanyId });
        console.log(userCompanyId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};




module.exports = {userRegister, userLogin, getAllUsers, getUserById}