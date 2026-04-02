const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userModel = require("../Model/user.model");

exports.status = (req, res) => {
    try {
        return res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.log(error)
        res.status(500).json('Internal Server Error')
    }
}

exports.health = (req, res) => {
    try {
        let state = mongoose.connection.readyState;
        return res.status(200).json({
            status: 'ok',
            database: state == 1 ? 'Connected' : 'Disconnected',
            uptime: process.uptime()
        })
    } catch (error) {
        console.log(error)
        res.status(500).json('Internal Server Error')
    }
}


exports.register = async (req, res) => {
    try {
        let data = req.body
        console.log(data);
        let keys = Object.keys(data);
        fulfills = keys.includes('username') && keys.includes('password') && keys.includes('email');
        if (fulfills === false) return res.status(400).json('Insufficient Data')
        else {
            if (!data?.displayName) data.displayName = data.username;
            data.password = await bcrypt.hash(data.password, 12);
            if (data?.role === 'admin') data.role = 'admin';
            else data.role = 'user';
            let response = await userModel.create(data)

            return res.status(201).json(`${data.role} create successfully`);
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

exports.login = async (req, res) => {
    try {
        let data = req.body
        let user = null;
        let keys = Object.keys(data);
        fulfills = (keys.includes('username') || keys.includes('email')) && keys.includes('password');
        if (fulfills === false) return res.status(400).json('Insufficient Data')
        else {
            console.log('data: ', data);
            if (data?.role) {
                user = await userModel.findOne({ username: data.username, isDeleted: false, role: data.role }).select('-isDeleted -__v');
            } else user = await userModel.findOne({ username: data.username, isDeleted: false, role: 'user' }).select('-isDeleted -__v');
            console.log('user: ', user)
            if (!user) return res.status(401).json(`Invalid Credentials`);
            else {
                let isValid = await bcrypt.compare(data.password, user.password);
                console.log(isValid, user.password, data.password);
                if (!isValid) return res.status(401).json(`Invalid Credentials`);
                else {
                    let tokenData = {
                        username: user.username,
                        _id: user._id,
                        email: user.email,
                        role: user.role,
                    }
                    let token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(token);
                }
            }
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

