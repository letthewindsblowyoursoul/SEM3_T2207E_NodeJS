const express = require("express");
const path = require("path");

var app = express();

app.use(express.json());

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use("/",express.static("./node_modules/bootstrap/dist/"));

app.get("/", (req, res) => {
    return res.redirect('/index.html');
});

app.listen(9000,"127.0.0.1",()=>{
    console.log("Listening to request on port 9000");
});