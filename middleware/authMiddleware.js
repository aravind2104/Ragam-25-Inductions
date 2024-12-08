const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const JWT_SECRET = process.env.JWT_SECRET; 

exports.authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user; // Attach user info

        console.log("User from Token:", req.user);  // Add this line for debugging

        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

exports.authorize = (role) => (req,res,next) => {
    if(req.user.role !== role){
        return res.status(403).json({message: 'Unauthorized'});
    }
    next();
};
