const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const OrderSchema = new Schema({
    Item: {
        type: Schema.Types.ObjectId,
        ref: "Food_Items",
        required: true
    },
    Quantity:{
        type: Number,
        default: 1
    },
    Buyer: {
        type: Schema.Types.ObjectId,
        ref: "Food_Items",
        required: true
    },
    Creator:{
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    VegORnot:{
        type: String,
        enum: ["Veg","Non Veg"],
        required: true
    },
    tags:{
        type: [String]
    },
    Addon:{
        type: [{Item:String,Price:Number}]
    }
});

module.exports = User = mongoose.model("Order", OrderSchema);