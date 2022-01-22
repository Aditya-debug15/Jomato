const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	age: {
		type: Number,
		required: true
	},
	ContactNumber: {
		type: Number,
		required: true
	},
	wallet: {
		type: Number,
		default: 0
	},
	Password: {
		type: String,
		required: true
	},
	batch:{
		type: Number,
		required: true
	},
	Favourite: {
		type: [{type: Schema.Types.ObjectId,ref: "Food_Items"}]
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
