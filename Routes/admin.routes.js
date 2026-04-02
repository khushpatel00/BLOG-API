const express = require('express');
const routes = express.Router();
const root = require('../Controller/admin.controller')
const { verifyTokenAdmin } = require('../Middleware/auth.js')

routes.get('/getAllAdmins', verifyTokenAdmin, root.fetchAllAdmins);


module.exports = routes;