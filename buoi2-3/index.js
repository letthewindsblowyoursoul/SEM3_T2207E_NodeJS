const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname,"node_modules/bootstrap")))
app.use(express.static(path.join(__dirname,"images")))
const PORT = process.env.PORT || 9000;
app.set("view engine", "ejs");
app.listen(PORT,() => {
    console.log("running");
});
var lss = [{
        
    name: "TDHOA",
    job: "TS",
    img: "1a.png"
 },{
    name: "TDHOA1",
    job: "TS",
    img: "1b.png"
 }];

app.get("/",  (req, res) => {
     
    res.render('main',{lss:lss});
});

app.get('/add',(req,res)=>{
    var paramimg = req.query.img;
    var paramname = req.query.name;
    var paramjob = req.query.job;
    var check = true;
    for(var i = 0; i < lss.length; i++){
        if(lss[i] == paramname){
            check = false;
            break;
        }}

    if(check == true){
        lss.push({
            img: paramimg,
            name: paramname,
            job: paramjob
        })
        res.render('add',{lss:lss});
    }else{
        res.render('full',{lss:lss});
    }
    
})

app.get('/del',(req,res)=>{
    var paraname = req.query.name;
    var check = false;
    var p = -1;
    for(var i = 0;i < lss.length; i++){
        if(lss[i].name == paraname){
            check = true;
            p = i;
            break;
        }
    }
    if(check == true){
        lss.splice(p,1);
        res.render('del',{lss:lss});
    }else{
        res.render('kq',{lss:lss});
    }
})

app.get('/update',(req,res)=>{
    var paramname
})