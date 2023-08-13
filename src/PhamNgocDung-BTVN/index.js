const express = require("express");
const port = 2010;
const publicDirectoryPath = path.join(__dirname,'./BT1')
app.use(express.static(publicDirectoryPath))
const app = express();

//BT1
app.use(express.static("BT1"));
app.use(express.urlencoded({extended: true}));

app.get("/",(req, res) =>{
    res.redirect("index.html")
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})