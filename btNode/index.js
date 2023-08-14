const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
const dataUser = [];
app.get("/ViewsUser",(req,res)=>{
    res.json(dataUser)
});

app.post("/ViewsUser",(req,res)=>{
    const addUser = req.body;
    addUser._id=dataUser.length+1;
    dataUser.push(addUser);
    res.status(200).json(addUser)
});

app.put("/ViewsUser/:id",(req,res)=>{
    const update = req.body;
    const userId = parseInt(req.params.id);
    const index = dataUser.findIndex(User => User._id === userId);
    if (index !== -1) {
        dataUser[index] = {...dataUser[index], ...update};
        res.json(dataUser[index]);
    } else{
        res.sendStatus(404);
    }
});

app.delete("/ViewsUser/:id",(req,res)=>{
    const userId = parseInt(req.params.id);
    const index = dataUser.findIndex(User => User._id === userId);
    if (index !== -1) {
        const deleteUser = dataUser.splice(index,1);
        res.json(deleteUser[0]);
    } else{
        res.sendStatus(404);
    }
});
app.listen(port,()=>{
    console.log(port);
})