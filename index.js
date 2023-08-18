const express = require('express');
const port = 9999;
const app = express();
const mongoose = require('./config/mongoose');
app.set('view engine','ejs');
app.use(express.urlencoded());
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/',require('./routes/indexroutes'));
app.listen(port,(err)=>{
    if(err){
        console.log("Server is not ready");
        return false;
    }
    console.log("Server is running on port : "+port);
});