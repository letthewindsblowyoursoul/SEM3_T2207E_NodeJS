//Importing express module
const express = require('express');
const app = express();
const port = 90;

// Set views engine
app.use(express.json());

// For serving static HTML files
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });

    // res.send("Hello World!");
    return res.redirect("index.html");
});

app.listen(port, () => {
	console.log(`The application started successfully on port ${port}`);
});
