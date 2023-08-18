const mongoose = require('mongoose')
const Schema = mongoose.Schema

var bookSchema =  new Schema({
    _id: mongoose.Schema.Types.ObjectId,
     title: String,
    summary: String,
    isbn: String,
    thumbnail: Buffer,
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Authors' 
    },
    ratings: [
        {
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: { 
                type: Date,
                default: Date.now
            }
        }
    ],
    created:{ 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('books', bookSchema);