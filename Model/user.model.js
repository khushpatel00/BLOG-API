const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin', 'user'],
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true,
    strict: true,
})

module.exports = mongoose.model('users', userschema);