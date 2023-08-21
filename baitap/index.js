const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
var Database = require('./database/database');
var routes = require('./routes/controller');



var app = express();

app.use(express.static(path.join(__dirname,"node_modules/bootstrap")))
app.use(express.static(path.join(__dirname,"images")))

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs'); //set view engine sử dụng ejs file.
app.set('views', './views'); //Cấu hình thư mục view.

// Website routes
app.use('/', routes);  //Sử dụng router được define trong var routes =


 
app.listen(2512, () => {
    console.log("Player Log in");
})
