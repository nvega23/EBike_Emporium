const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    reviewer:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    reviewee:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        index: true
    },
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Review", ReviewSchema);
