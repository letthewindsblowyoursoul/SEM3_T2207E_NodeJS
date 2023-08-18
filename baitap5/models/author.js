const mongoose = require('mongoose')
const Schema = mongoose.Schema

var authorSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
            firstName: String,
        lastName: String
    },
    biography: String,
    twitter: String, 
    profilePicture: Buffer,
    created: { 
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('authors', authorSchema);
