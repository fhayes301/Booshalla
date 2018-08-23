const mongoose = require('mongoose');
const Schema = mongoose.Schema

const subscriberSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	}
})

module.exports = mongoose.model('subsciber', subscriberSchema)
