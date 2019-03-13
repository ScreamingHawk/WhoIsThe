const log = require('../logger')

module.exports = (io, socket, store, common) => {
	socket.on('myname set', name => {
		log.debug(`User set name to ${name}`)
		const user = store.users.find(u => u.id === socket.id)
		if (user){
			// Update user
			user.name = name
		} else {
			// Create new user
			store.users.push({
				name,
				id: socket.id,
				active: true,
				titles: [],
			})
			common.systemMessage(name, 'joined the game')
		}
		// Update clients
		socket.emit('myname is', name)
		io.emit('users is', store.users)
	})
}
