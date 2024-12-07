const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const JWT_SECRET = process.env.JWT_SECRET; 

const authenticate = (req,res,next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(403).json({message: 'No token provided'});
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({message: 'Invalid token'});
        }
        req.user = user;
        next();
    });
};

module.exports = authenticate;