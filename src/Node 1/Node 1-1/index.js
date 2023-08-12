const post = require('./post.js');
const user = require('./user.js');

post.createPost();  
post.commentOnPost();


user.createUser();
user.deleteUser();