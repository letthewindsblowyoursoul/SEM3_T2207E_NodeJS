const express = require('express');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.get('/product', (req, res) => {
    var products = {
        Name: "Car",
        Type: "7 seats",
        Date: "2022",
        Code: "123",
        Image: "https://miro.medium.com/v2/resize:fit:828/format:webp/1*jeVt66x40MMSUv6YaRXwAA.png"
    }
    res.render('product', products);
});

app.listen(9002,()=>{
    console.log("Listening on 9002");
})