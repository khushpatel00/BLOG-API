const mongoose = require('mongoose')

const blogschema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    cover: {
        type: String,
        required: false
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

module.exports = mongoose.model('blogs', blogschema);