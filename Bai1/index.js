//xây nhà
const express = require("express");
const app = express();
//cấp cổng
const PORT = process.env.PORT || 2000;
// mở cửa 
app.listen(PORT,function(){
   console.log("server đang chạy");
});

var user = [{
     id: 1,    
    name: "Nguyen Van An",
        age: 18
         
    },
    {
     id: 2,    
    name: "Tran cao Ba",
        age: 18
    } 
     
    
]
app.get('/', (req,res) => {
    res.status(200).send(user);
})

/*const fs = require("fs");
const path = require("path");

app.get('/user',(req,res)=>{
    var output = fs.readFile('./user.json',(err,output)=>{
        res.status(200).send(output.toString()); 
    })
}) */

app.get('/detail',(req,res) => {
var paramid = req.query.id;
var data;
for (var i = 0; i < user.length; i++){
    if(user[i].id == paramid){
        data = user[i];
        break;
    }
}
res.status(200).send(data);
})

app.get('/add',(req,res)=>{
    var paramid = req.query.id;
    var paramname = req.query.name;
    var paramage = req.query.age;

    var check = true;
    for(var i = 0; i < user.length; i++){
        if(user[i] == paramid){
            check = false;
            break;
        }
    }

    if(check == true){
        user.push({
            id: paramid,
            name: paramname,
            age: paramage
        })
        res.status(200).send("added id " + paramid + " name " + paramname);
    }else{
        res.status(200).send("already have id " + paramid);
    }
    
})

app.get("/edit",   (req, res) =>{
    var paramid = req.query.id;
    var paramname = req.query.name;
    var paramage = req.query.age;
    var check = false;
    for ( var i = 0; i < user.length; i++){
        if ( user[i].id == paramid){
            user[i].name = paramname;
            user[i].age = paramage;
            check = true;
            break;
        } 
    }
    if (check == true){
    res.status(200).send("edited id " + paramid);
}else {
    res.status(200).send("cant find id " + paramid);
}
    
 });

 app.get("/delete", (req, res) => {
    var paramid = req.query.id;
    var p = -1;
    for ( var i = 0; i < user.length; i++){
        if ( user[i].id == paramid){
            p = i
        }
    }
    if (p != -1) {
        user.splice(p,1);
    }
    res.send("done");
});
