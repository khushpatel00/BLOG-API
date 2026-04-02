const express = require('express');
const routes = express.Router();
const root = require('../Controller/index.controller')

routes.get('/health', root.health);
routes.get('/status', root.status);

routes.post('/register', root.register);
routes.post('/login', root.login);


module.exports = routes;