const express = require('express');
const app = express();
const jade = require('jade');

//set view engine
app.set('view engine', 'jade');

app.get('/', (req, res) => {
    res.render('Sample');        //Render file Samole.jade trong thư mục views vào đây
});

app.listen(9004,()=>{
    console.log(`Listening on port`);
});