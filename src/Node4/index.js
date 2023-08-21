const express = require('express');
const fs = require('fs');

var app = express();

app.use(express.json());

const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`));

app.get("/api/v1/users", (req, res) => {
    res.status(200).json({
        status: "Success",
        data: {
            users,
        },
    });
});

app.post("/api/v1/users", (req, res) => {
    
});

app.listen(9000,"127.0.0.1",()=>{
    console.log("Listening to request on port 9000");
});
