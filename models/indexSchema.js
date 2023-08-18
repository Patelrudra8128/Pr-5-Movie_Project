const mongoose = require('mongoose');

const tblschema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

const Record = mongoose.model('Record', tblschema);
module.exports = Record;