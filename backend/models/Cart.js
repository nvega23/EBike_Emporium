const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    posts: [
        {
         post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
         },
         quantity: Number,
         price: Number,
        },
    ],
    cartTotal: Number,
    orderBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})

module.exports = Cart = mongoose.model("Cart", cartSchema);
