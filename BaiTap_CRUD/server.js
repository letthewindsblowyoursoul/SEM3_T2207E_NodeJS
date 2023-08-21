const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(process.env.DB_URI,{useNewUrlParser: true});
const db=  mongoose.connection;
//db connection error handling
db.on('err',(Error)=>console.log(Error));
db.once('open',()=>console.log('database connected !'));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('', require('./routes/routes'));
app.use(express.static('uploads'));
app.use('',require('./routes/api'));

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

