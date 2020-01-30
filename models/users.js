const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profileImage:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);