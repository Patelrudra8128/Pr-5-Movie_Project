const { name } = require('ejs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const table = require('../models/indexSchema');

const index = (req,res) => {
    console.log("Index Routing");
    return res.render('index');
}

const insertData = (req,res) => {
    const { name, description, price } = req.body;
    let image = "";

    if (req.file) {
        image = req.file.path;
    }
    table.create({
        image: image,
        name: name,
        description: description,
        price: price
    }).then((success) => {
        console.log("Data inserted successfully");
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return false;
    })
}


const viewData = (req,res) => {
    table.find({}).then((data)=>{
        return res.render('view',{
            data
        })
    }).catch((err)=>{
        console.log(err);
        return false;
    })
}

const deleteData = (req,res) => {
    let id = req.query.id;
    table.findById(id).then((single)=>{
        fs.unlinkSync(single.image);
        table.findByIdAndDelete((id)).then((data)=>{
            return res.redirect('back');
        }).catch((err)=>{
            console.log(err);
            return false;
        })
    }).catch((err)=>{
        console.log(err);
        return false;
    })
    
}

const editData = (req,res) => {
    let id = req.query.id;
    table.findById((id)).then((data)=>{
        return res.render('edit',{
            data
        });
    }).catch((err)=>{
        console.log(err);
        return false;
    })
}

const updateData = (req,res) => {
    let editid = req.body.editid;
    const{name,description,price} = req.body;
    let image = req.file ? req.file.path : "";

    if (req.file) {
        table.findById(editid).then((oldImage)=>{
            fs.unlinkSync(oldImage.image);
            table.findByIdAndUpdate(editid,{
                image : image,
                name : name,
                description : description,
                price : price
            }).then((data)=>{
                console.log("Record Updated Successfully");
                return res.redirect('viewData');
            }).catch((err)=>{
                console.log(err);
                return false;
            })
        }).catch((err)=>{
            console.log(err);
            return false;
        })
    }else{
        table.findByIdAndUpdate(editid,{
            name : name,
            description : description,
            price : price
        }).then((data)=>{
            console.log("Record Updated Successfully");
            return res.redirect('viewData');
        }).catch((err)=>{
            console.log(err);
            return false;
        })
    }
}

module.exports = {
    index,
    insertData,
    viewData,
    deleteData,
    editData,
    updateData
}