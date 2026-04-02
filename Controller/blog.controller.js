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
exports.deleteBlog = async (req, res) => {
    try {
        let objectId = req.params._id;
        let response = await blogModel.findByIdAndUpdate(objectId, { isDeleted: true });
        return res.status(200).json('blog deleted successfully')
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}
exports.updateBlog = async (req, res) => {
    try {
        let objectId = req.params._id;
        let response = await blogModel.findByIdAndUpdate(objectId, { ...req.body });
        return res.status(200).json('blog deleted successfully')
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}
