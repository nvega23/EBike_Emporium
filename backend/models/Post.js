const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
reciepeName: {
    type: String,
    required: false
},
body: {
    type: String,
    required: true
},
price: {
    type: Number,
    required: false
},
imageUrls: {
    type: [String],
    required: false
  },
  likes: [
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
  ]
},{
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
