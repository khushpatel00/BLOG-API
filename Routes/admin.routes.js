const express = require('express');
const routes = express.Router();
const root = require('../Controller/admin.controller')
const { verifyToken } = require('../Middleware/auth.js')

routes.get('/getAllAdmins', verifyToken, root.fetchAllAdmins);


module.exports = routes;