const log = require('../util/logger')

const sendUsers = (io, store) => {
	io.emit('users is', store.users)
}

module.exports = {
	configureUsers: (io, socket, store, common) => {
		// Return user list to client
		socket.on('users get', () => {
			socket.emit('users is', store.users)
		})

		// Handle user setting their name
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
			sendUsers(io, store)
		})
	},
	sendUsers,
}
