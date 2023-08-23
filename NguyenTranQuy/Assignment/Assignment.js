const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const { MongoGridFSChunkError } = require("mongodb");

const app = express();

dotenv.config();
var ProductCollection = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));

app.set("view engine","ejs");
app.get('/api/v1/data', (req, res) =>{
    res.status(200).json({
        status : "Success",
        data: {data}
    });
});



mongoose.connect(process.env.MongoDB)
        .then(() => console.log("Connect Successful"))
        .catch((error) => console.log("Connect failed", error))
        .finally(() => console.log("Finaly....."));

const dataSchema = new mongoose.Schema({
    ProductCode: {
        type : String,
        unique: true,
        required: [true, "ProductCode is required"]
    },
    ProductName: String,
    ProductData: Date,
    ProductOriginPrice : Number,
    Quantity : Number,
    ProductStoreCode : String
});

const data = mongoose.Model("Data", dataSchema);

app.use(express.json());

app.post("/", (req, res) => {
    const newProduct = new ProductCollection(req.body);

    newProduct
        .save()
        .then((doc) => {
            console.log
        })    
})

app.listen(9005, () => {
    console.log("App is listening on port: ")
})