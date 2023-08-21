function createPost(){
    console.log("Create e new post");
}
function commentOnPost(){
    console.log("Comment on this post");
}
/*Sử dụng export model*/
module.exports = {
    createPost: createPost,
    commentOnPost: commentOnPost
};