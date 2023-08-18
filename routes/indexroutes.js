const express = require('express');
const routes = express.Router();
const indexcontroller = require('../controllers/indexController');
const multer = require('multer');
const file = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const imageUpload = multer({storage : file}).single('image');
routes.get('/',indexcontroller.index);
routes.post('/insertData',imageUpload, indexcontroller.insertData);
routes.get('/viewData',indexcontroller.viewData);
routes.get('/deleteData',indexcontroller.deleteData);
routes.get('/editData',indexcontroller.editData);
routes.post('/updateData',imageUpload,indexcontroller.updateData);
module.exports = routes;