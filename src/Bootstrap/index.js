const express = require("express")
const path = require('path')

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/user.ejs'))
});



app.listen(9002, () => {
    console.log(`Example app listening at 9001`)
});
