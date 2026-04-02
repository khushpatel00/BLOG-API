const { response } = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../Model/user.model');

exports.verifyToken = async (req, res, next) => {
    let user = null;
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else return res.status(401).json('Token Required')
    let response = jwt.verify(token, process.env.JWT_SECRET)
    if (response?._id) user = await userModel.findById(response._id)
    if (!user) return res.json('Invalid Token')
    else {
        req.tokenData = response;
        next();
    }
}