const log = require('../logger')

module.exports = {
	configureChat: (io, socket, store) => {
		socket.on('chat send', message => {
			const user = store.users.find(u => u.id === socket.id)
			if (user){
				log.debug(`${user.name} chatted ${message}`)
				io.emit('chat new', {
					name: user.name,
					message,
					ts: new Date(),
				})
			}
		})
	},
	systemMessage: (io, item, message) => {
		log.debug(`Sending system message ${item} ${message}`)
		io.emit('chat system', {
			system: true,
			item: item,
			message,
			ts: new Date(),
		})
	}
}
