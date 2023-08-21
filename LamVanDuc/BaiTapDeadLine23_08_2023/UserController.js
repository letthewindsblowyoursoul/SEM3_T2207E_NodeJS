


const { response } = require("express");
const model = require("./ConnectMongodb");





async function getUser(username,fullName,address , age){
    try {
        
        var data = {}; // Khởi tạo một đối tượng trống
        if (username != undefined && username != null && username.length >0) {
            data.username = username;
        }
        if (fullName != undefined && fullName != null && fullName.length >0) {
           
            const regexFullName = new RegExp(fullName, "i");
            data.fullName = {
                $regex : regexFullName
            };
        }
        if (address != undefined && address != null && address.length >0) {
            const address = new RegExp(address, "i");
            data.address = {
                $regex : regexFullName
            };
        }
        if (age != undefined && age != null && age.length >0) {
            data.age = age;
        }
        
        var findUser = await model.find(data).then((res)=>{
            return res
        }).catch((err)=>{
            return [];
        })
    
        return findUser;
    } catch (error) {
        throw error
    }
   
}







async function addUser(data) {
    try {
        console.log(data);
      var findUser = await model.findOne({username : data.username}).then((res) => {
            return res;
          }).catch((err) => {
            return null;
          });

    if(findUser == null || findUser.length == 0)
    {
        var addModel = new model({
            username : data.username,
            fullName : data.fullName,
            address : data.address,
            age:data.age,

        })
        await addModel.save();
        var responseMessage = {
            message : "Thêm thành công.",
            status : 200
        };
        return responseMessage;
    }else{
       
        var responseMessage = {
            message : "username "+findUser.username +" đã tồn tại.",
            status : 409
        };
        return responseMessage
    }
    } catch (error) {
        var responseMessage = {
            message : "Đã xảy ra lỗi không mong muốn : "+error.message,
            status : 501
        };
        return responseMessage; 
    }
}





async function deleteUser(id){
    try {
        return model.findByIdAndDelete(id).then((succ)=>{
            if(succ == null){
                var data = {
                    message: "User không tồn tại.",
                    status : 400
                }
                return data;
            }else{
                var data = {
                    message: "Xóa thành công user "+succ.username,
                    status : 200
                }
                return data
            }
        }).catch((err)=>{
            var data = {
                message: "Đã xảy ra lỗi không mong muốn: "+err.message,
                status : 501
            }
            return data
        })
    } catch (error) {
        var data = {
            message: "Đã xảy ra lỗi không mong muốn: "+error.message,
            status : 501
        }
        return data
    }
}




async function updateUser(username , dataUpdate){
    const filter = { username: username }; // Điều kiện tìm kiếm
    
    if (dataUpdate.hasOwnProperty("username")){
        delete dataUpdate.username;
    }

   return model.findOneAndUpdate(filter, dataUpdate)
    .then((res) => {
        if(res == null){
           var dataRespon = {
                status : 404,
                message : "Không tìm thấy username "+username,
            }
            return dataRespon
        }else{
            var dataRespon = {
                status : 200,
                message : "cập nhật thành công user "+res.username,
            }
            return dataRespon
        }
        
    })
    .catch(error => {
        dataRespon = {
            status : 501,
            message : "Đã xảy ra lỗi ngoài ý muốn: "+error.message,
        }
        return dataRespon
    });
}






module.exports = {
    addUser : addUser,
    getUser : getUser,
    deleteUser : deleteUser,
    updateUser : updateUser,
}

