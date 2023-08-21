var express = require('express');
var app = express();
var fs = require("fs"); // fs dùng để đọc file.
const bodyParser = require('body-parser'); // lấy ra dữ liệu có trong body của API. install bnagwf cách npm install body-parser
const filePath = __dirname + "/" + "Data.json"; // file json thao tác dữ liệu.

app.use(bodyParser.json()); // sử dụng để có thể đọc được body truyền tải lên.

// form json data
var dataExample = {
    "username" : null,
    "fullName" : null,
    "email" : null,
    
}

const readJsonFile = () => {
  const rawData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawData);
  return jsonData;
};


const writeJsonFile = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData);
};


app.get('/api/V1/User', function (req, res) {

    var data = readJsonFile();
    const fullName = req.query.fullName;
    var searchResult = null;
      searchResult = data.filter(item => {
        // Kiểm tra nếu tên của mục chứa chuỗi tìm kiếm
        return item.fullName.toLowerCase().includes(fullName.toLowerCase());
      });
   if(fullName == "all"){
      searchResult = data;
    }

  res.status(200).send(searchResult);
});


// Thêm user

app.post('/api/V1/User', (req, res)=> {


  var dataJson = readJsonFile(); // lấy tất cả dữ liệu
  const formData = req.body; // Dữ liệu từ yêu cầu POST


  if(formData.username == undefined || formData.username == null || formData.username.length == 0){

    res.status(400).send("Thiếu dữ liệu username.");

  }else if(formData.fullName == undefined || formData.fullName == null || formData.fullName.length == 0){

    res.status(400).send("Thiếu dữ liệu fullName.");

  }else{
    if(dataJson.findIndex(x=> x.username == formData.username) != -1){
      res.status(409).send("Đã tồn tại user "+formData.username);
    }else{

      const dateNow = new Date().toLocaleDateString('en-GB');
      var data = {
        username : formData.username,
        fullName : formData.fullName,
        email : formData.email,
        create : dateNow,
        update : null,
        
      }
      dataJson.push(data)
      writeJsonFile(dataJson)
      res.status(200).send("Thêm thành công "+formData.username);
    }
  }
  

});


app.put('/api/V1/User/:username', (req, res)=> {

  try{

    var dataJson = readJsonFile(); // lấy tất cả dữ liệu
    const formData = req.body; // Dữ liệu từ yêu cầu POST
  
  
    if(formData.fullName == undefined || formData.fullName == null || formData.fullName.length == 0){
  
      res.status(400).send("Thiếu dữ liệu fullName.");
  
    }else{
  
      const indexEdit = dataJson.findIndex(x=> x.username == req.params.username);
      console.log(indexEdit);
      if(indexEdit == -1){
        res.status(404).send("Không tìm thấy user cần sửa");
      }else{
        const dateNow = new Date().toLocaleDateString('en-GB');
        dataJson[indexEdit].fullName = formData.fullName;
        dataJson[indexEdit].email = formData.email;
        dataJson[indexEdit],update = dateNow;
        writeJsonFile(dataJson)
        res.status(200).send("Sửa thành công user "+formData.username);
      }
    }


  }catch(ex){
    res.status(501).send("Server đã xảy ra lỗi : "+ex);
  }
  
  

});





app.delete('api/v1/User/:username', (request , response)=>{
  const username = request.params.username;
  if(username == undefined || username == null || username.length > 0){
    response.status(400).send("Không có giá trị cần xóa.");
  }else {
        var jsonArray = readJsonFile();
        const indexToRemove = jsonArray.findIndex(item => item.username === username);
      
        if (indexToRemove !== -1) {
            // Xóa phần tử khỏi mảng
            jsonArray.splice(indexToRemove, 1);
      
            response.status(200).send("Xóa thành công.");
        }else{
            response.status(404).send("Không tìm thấy người dùng "+username);
        }
  }

  



  
});




app.listen(3000,"127.0.0.1", function () {
  console.log('Example app listening on port 3000!');
});