const express = require('express');
const bodyparse = require('body-parser');
const { getMaxListeners } = require('./server/database/connection');
const dotenv = require('dotenv').config();
const path =require('path');
//const con = require('./server/database/connection')
const router = require('./server/router/router')
const app=express();
//middlewares
app.use(bodyparse.urlencoded({ extended: true }));
app.use(bodyparse.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/api/css',express.static(path.join(__dirname,'public/css')));
app.set('view engine','ejs')
//routes
app.use('/',router)
//setting port
app.listen(3000,(err)=>{
    if(err)
    console.log(err);
    else{
        console.log(`app running on port${3000}`);
    }
})
