const blogModel = require("../Model/blog.model");

exports.fetchAllBlogs = async (req, res) => {
    try {
        let blogs = await blogModel.find({ isDeleted: false }).select('-isDeleted -__v');
        return res.status(200).json(blogs);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

exports.addBlog = async (req, res) => {
    try {
        let data = req.body
        let keys = Object.keys(data);
        fulfills = keys.includes('title') && keys.includes('description');
        if (fulfills) {
            tokenData = req.tokenData;
            data.cover = req.file ? `/uploads/${req.file.filename}` : ''
            data.author = tokenData._id;
            let response = await blogModel.create(data);
            return res.status(201).json('Blog added successfully');
        } else return res.status(401).json('Insufficient Data');
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}
