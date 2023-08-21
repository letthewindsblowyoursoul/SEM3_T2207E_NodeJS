const express = require("express");
const ejs = require("ejs");
const path = require('path');
const user = require("./UserController");
const myApp = express();

// set config get data body client request
myApp.use(express.urlencoded({extended: true})); 
myApp.use(express.json());   

myApp.use(express.static(path.join(__dirname, 'node_modules/javascript')));
//node_modules/javascript/callApi.js
//===================== view ===============
myApp.set("view engine" , "ejs")
myApp.get('/index', (req, res) => {
    res.render('index');
});

//====================== api ===============

myApp.post('/api/v1/User',async (req , response)=>{
    response.setHeader("Content-Type", "application/json");
    try{
        var body = req.body;
        
        if(body.username == undefined || body.username == null || body.username.length == 0){
            return response.status(400).send("Vui lòng nhập username.")
        }
        if(body.fullName == undefined || body.fullName == null || body.fullName.length == 0){
            return response.status(400).send("Vui lòng nhập họ và tên.")
        }
    
        var data = {
            username : body.username,
            fullName : body.fullName,
            address : body.address,
            age:body.age,
        }
       
        var responseMessage =  await user.addUser(data);
        
        return  response.status(responseMessage.status).send(responseMessage.message)
    }catch(ex){
        
        return  response.status(501).send("Đã xảy ra lỗi không mong muốn "+ex.message)
    }
})




myApp.get("/api/v1/User",async (req,res)=>{
    try {
        var username = req.query.username;
        var fullName = req.query.name;
        var address = req.query.address;
        var age = req.query.age;

        let data = await user.getUser(username , fullName , address, age);
       return res.status(200).send(data);
    } catch (error) {
       return res.status(501).send(error);
    }
})




myApp.delete("/api/v1/User/:id",async(req,res)=>{

    try {
        if(req.params.id == undefined || req.params.id == null || req.params.id.length == 0){
           return res.status(400).send("vui lòng chọn người cần xóa.")
        }else{
          let response = await user.deleteUser(req.params.id)
           return res.status(response.status).send(response.message)
        }
        
    } catch (error) {
       return res.status(501).send("Đã xảy ra lỗi không mong muốn : "+error.message)
    }
})



myApp.put("/api/v1/User/:username",async(req,res)=>{
   
    try {

        var body = req.body;
            if(req.params.username == undefined || req.params.username == null || req.params.username.length == 0){
                return  res.status(400).send("Vui lòng chọn username cần sửa.")
            }
            if(body.fullName == undefined || body.fullName == null || body.fullName.length == 0){
                return res.status(400).send("Vui lòng nhập họ và tên.")
            }
            var dataRespon = await user.updateUser(req.params.username,body);
                return res.status(dataRespon.status).send(dataRespon.message)
    } catch (error) {
        return res.status(501).send("Đã xảy ra lỗi không mong muốn: "+error.message)
    }
    
});




myApp.listen(80 ,"127.0.0.10",()=>{
console.log("127.0.0.10");
})
