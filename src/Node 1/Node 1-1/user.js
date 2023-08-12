function createUser(){
    console.log("Create a new user");
}
function deleteUser(){
    console.log("Delete a user");
}

/*Sử dụng export model*/
module.exports = {
    createUser: createUser,
    deleteUser: deleteUser
};