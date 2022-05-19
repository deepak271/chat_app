const express = require('express')
const routes = express.Router();
const services = require('../services/services');
const controller = require('../controller/controller')
routes.get('/',services.login);
routes.get('/signup',services.signup);
routes.get('/home',services.homepage)
//API
routes.post('/api/login',controller.finduser);
routes.post('/api/adduser',controller.adduser);


module.exports=routes;