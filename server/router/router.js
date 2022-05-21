const express = require('express')
const routes = express.Router();
const services = require('../services/services');
const controller = require('../controller/controller')
const auth =require('../middleware/auth');

routes.get('/',services.login);
routes.get('/signup',services.signup);
routes.get('/home',auth.isAuth,services.homepage)
//API
routes.post('/api/login',controller.finduser);
routes.post('/api/adduser',auth.isAuth,controller.adduser);
routes.get('/api/forget',services.forget);
routes.post('/api/forget',controller.findemail);
routes.get('/api/reset',services.reset);
routes.post('/api/reset',controller.setpass);

module.exports=routes;