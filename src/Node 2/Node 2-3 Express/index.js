const express = require("express");

const app = express();
// Use Get Method
app.get('/',(req,res)=>{
    res.status(200).send("Server say hello client");
});

// Use Post
app.post('/',(req,res)=>{
    res.status(200).send("Post method");
});
// Routing Path
app.get('/home',(req,res)=>{
    res.status(200).send("This is home page");
});

app.get('/aboutme/me.txt',(req,res)=>{
    res.status(200).send("This is me.txt");
});

// Get parameter
// http://localhost:9003/users/10/books/5
app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
  });

  app.get('/user/:userId(\d+)', (req, res) => {
    res.send(req.params)
  });

//Listening  on port
const port = 9003;
app.listen(port,()=>{
    console.log(`Listening on port:${port}`);
});
