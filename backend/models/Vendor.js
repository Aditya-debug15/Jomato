const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const VendorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    shop_name: {
        type: String,
        required: true,
        unique: true
    },
    ContactNumber:{
        type: Number,
        required: true
    },
    Current_order: {
        type: Number,
        default: 0
    },
    OpenTime:{
        type:String,
        required:true
    },
    CloseTime:{
        type:String,
        required:true
    },
    items:{
        type: [{type: Schema.Types.ObjectId,ref: "Food_Items"}]  
    },
    Password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model("Vendors", VendorSchema);