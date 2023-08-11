const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const users = [];

// Yêu cầu lấy dữ liệu từ http gửi về client
app.get('/users',(req, res)=>{
    // Trả về danh sách các user
    res.json(users);
});

// ADD thêm user 
app.post('/users',(req, res)=>{
    const newUser = req.body;
    newUser._id = users.length+1;
    users.push(newUser);
    res.status(201).json(newUser);
});

//Uapdet user
app.put('/users/:id',(req, res)=>{
    const userId = parseInt(req.params.id);
    const updateUser = req.body;
    const index = users.findIndex(user => user._id === userId);
    if (index!== -1) {
        users[index] = {...users[index],...updateUser};
        res.json(users[index])
    }else {
         res.sendStatus(404);
    }
});

app.delete('/users/:id',(req, res)=>{
    const userId = parseInt(req.params.id);
    const i = users.findIndex(user => user._id === userId);
    if (i !== -1){
        const deleteUser = users.splice(i, 1);
        res.json(deleteUser[0]);
    }else {
       res.sendStatue(404);
    }
})



app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})