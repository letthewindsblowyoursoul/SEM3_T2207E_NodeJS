
// Importing express module
const express = require("express");
const path = require('path')
const port = 9002;
const app = express();


app.use(express.json());
 
// For serving static HTML files
app.use(express.static("public"));
app.use('/',express.static(path.join(__dirname,"node_modules/bootstrap/dist")))
app.use("/",express.static("node_modules/bootstrap/dist/"))
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
 
    // res.send("Hello World");
    return res.render('user.ejs');
});

// Handling the get request
app.get("/", (req, res) => {
	res.send("Hello World");
});

// Starting the server on the 80 port
app.listen(port, () => {
	console.log(`The application started successfully on port ${port}`);
});


