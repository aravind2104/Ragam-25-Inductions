const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

exports.register = async (req, res) => {
    const { name, email, password, membership_type } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, membership_type });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error in registering user", error: error.message });
    }
};

exports.login = async (req, res) => {
    console.log('Login function called');
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(401).json({message: 'Incorrect password'});
        }
        const token = jwt.sign(
            {id:user._id,email: user.email},
            process.env.JWT_SECRET, 
            {expiresIn: '1h'}
        );
        console.log(token);
        res.status(200).json({message:"Login Successful",token:token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in logging in user", error: error.message });
    }
};