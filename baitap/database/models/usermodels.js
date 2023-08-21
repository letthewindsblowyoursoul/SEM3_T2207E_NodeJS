const mongoose = require('mongoose')
const Schema = mongoose.Schema
//var AutoIncrement = require('mongoose-sequence')(mongoose);
 

var userSchema =  Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    userid: {
        type: Number,
        unique:true
      },
    username: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName:{
        type: String
    },

    age: {
        type: Number,
        default: 18    
    },
    address: String,
    created: {
        type: Date,
        default: Date.now
    }
});

//userSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'userid'});

module.exports = mongoose.model('usersps', userSchema);

 