const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Project-5');
const db = mongoose.connection;
db.on('connected',(err)=>{
    if(err){
        console.log("Db is not ready");
        return false;
    }
    console.log("Db is ready");
});
module.exports = db;