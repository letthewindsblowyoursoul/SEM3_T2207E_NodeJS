const express = require('express');
const path = require('path');
const app = express();




// For serving static HTML files
const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));
// Add express static bootstrap module
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use("/",express.static("./node_modules/bootstrap/dist/"));
app.post('/adduser',(req,res)=>{
    console.log(req.body);
});

app.listen(9005,()=>{
    console.log("Listening ....");
});