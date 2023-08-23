const express = require('express');
const path = require('path');         //path cũng như một thư viện như express
const app = express();
const port = 98;

//Set view engine
app.use(express.json());

//For serving static HTML files
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));

//Add express static bootstrap module
//Khai báo hai dòng này để sử dụng các tệp tĩnh ở trong bootstrap khi tải về máy
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use("/", express.static("./node_modules/bootstrap/dist/"));

app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",    //Header HTTP "Access-Control-Allow-Origin" 
                                               //cho phép máy chủ tại nguồn B chỉ định rằng 
                                               //trang web ở nguồn A được phép truy cập vào 
                                               //tài nguyên của mình mà không vi phạm Chính sách cùng nguồn.
    });
    return res.redirect("index.html");
});

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})