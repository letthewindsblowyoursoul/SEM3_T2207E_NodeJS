const express = require("express");
const app = express();

app.listen(9006, ()=>{
    console.log("listening on port")
});

//set view engine
app.set("view engine","jade");

app.get('/example', (req, res)=>{
    var user ={
        name :"Nguyen Minh Khanh",
        mail :"asdafasf",
        

    }
})