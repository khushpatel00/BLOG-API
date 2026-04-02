const express = require('express');
const routes = express.Router();
const root = require('../Controller/blog.controller');
const { verifyToken, verifyTokenAdmin } = require('../Middleware/auth');
const uploads = require('../Middleware/blog.multer')

routes.get('/', verifyToken, root.fetchAllBlogs)
routes.post('/addBlog', verifyTokenAdmin, uploads.single('cover'), root.addBlog)
routes.delete('/:_id', verifyTokenAdmin, root.deleteBlog)
routes.put('/:_id', verifyTokenAdmin, root.updateBlog)

module.exports = routes;