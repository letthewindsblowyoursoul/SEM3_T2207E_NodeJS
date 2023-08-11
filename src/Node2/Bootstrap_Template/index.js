const express = require("express");

var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    return res.redirect('index.html');
});

app.listen(9000,"127.0.0.1",()=>{
    console.log("Listening to request on port 9000");
});