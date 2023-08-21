const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required : true      
    },
    image:{
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required : true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', userSchema)
