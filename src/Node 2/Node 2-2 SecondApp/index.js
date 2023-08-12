// 1. Server lắng nghe kết nối
// 2. Đọc nội dung file
// 3. Hiển thị nội dung lên trình duyệt
var path = require("path");
var http = require("http");
var fs = require("fs");
var url = require("url");

const server = http.createServer((req, res) => {
  console.log("Request " + req.url);
  var urlParam = url.parse(req.url);
  var filename = path.join(".",urlParam.pathname);
  console.log("Request by url:" + urlParam);
  console.log("File name:" + filename);
  // Read file
  var output = "Hello!!!"
  output = fs.readFile('./input.txt',(err,output)=>{
    console.error(err);
    console.log(output.toString());
    // Response context
    res.writeHead(200,{'Content-type':'text/html'});
    res.end(output);
  })
  
});

server.listen(9002, "127.0.0.1", () => {
  console.log("Listening to request on port 9002");
});
