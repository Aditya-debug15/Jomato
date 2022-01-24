const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const OrderSchema = new Schema({
    item_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    placed_time: {
        type: String, 
        required: true 
    },
    status: {
        type: String,
        default: "Placed"
    },
    Addon: {
        type: [{ Item: String, Price: Number }]
    }
});

module.exports = User = mongoose.model("Order", OrderSchema);