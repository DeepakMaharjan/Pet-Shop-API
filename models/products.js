const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productImage:{
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    productDesc:{
        type: String,
        required: true
    },
    productCategory:{
        type: String,
        required: true
    },
    productPrice:{
        type: String,
        required: true
    },
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);