// Importing express module
const express = require("express");

const port = 80;
const app = express();


app.use(express.json());
 
// For serving static HTML files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// Add express static bootstrap module
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use("/",express.static("./node_modules/bootstrap/dist/"));

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
 
    // res.send("Hello World");
    return res.redirect("index.html");
});

// Handling the get request
app.get("/", (req, res) => {
	res.send("Hello World");
});

// Starting the server on the 80 port
app.listen(port, () => {
	console.log(`The application started successfully on port ${port}`);
});
