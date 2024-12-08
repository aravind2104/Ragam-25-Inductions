const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { name, email, password, membership_type } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, membership_type });
        await newUser.save();
        console.log("saved");
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error in registering user", error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        const user = await User.findOne({ email});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(401).json({message: 'Incorrect password'});
        }
        const token = jwt.sign({id:user.id,email: user.email}, JWT_SECRET, {expiresIn: '1h'});
        console.log(JWT_SECRET);
        console.log(token);
        res.status(200).json({message:"Login Successful",token:token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in logging in user", error: error.message });
    }
};