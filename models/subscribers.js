const mongoose = require('mongoose');
const Schema = mongoose.Schema

const subscriberSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	}
})

module.exports = mongoose.model('subsciber', subscriberSchema)
