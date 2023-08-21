const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({path:"./config.env"});
var urlMongoose = process.env.DATABASE_LOCAL;

mongoose.connect(urlMongoose).then(()=>{
    console.log("Connect success.");
}).catch((ex)=>{
    console.log("Exception : "+ex.Message);
}).finally(()=>{
    console.log("finally . . .");
})



// schema

const schemaUser = new mongoose.Schema({
        username : {
        type:String,
        required:[true,"Username is required"],
        unique : true,
        },
        fullName:String,
        address : String,
        age : Number,
})


const user = mongoose.model("Users",schemaUser);


module.exports = user;