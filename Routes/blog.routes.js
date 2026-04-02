const express = require('express');
const routes = express.Router();
const root = require('../Controller/blog.controller');
const { verifyToken } = require('../Middleware/auth');
const uploads = require('../Middleware/blog.multer')

routes.get('/', verifyToken, root.fetchAllBlogs)
routes.post('/addBlog', verifyToken, uploads.single('cover'), root.addBlog)

module.exports = routes;