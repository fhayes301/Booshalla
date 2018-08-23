const Subscriber = require('../models/subscribers.js')

module.exports = {
	read(req, res, next) {
		Subscriber.find({})
			.then(result => {
				res.send(result)
			})
			.catch(next)
	},
	create(req, res, next) {
		const props = req.body
		Subscriber.create(props)
			.then((subscriber) => {
				res.send(subscriber)
			})
			.catch(next)
	}

}
