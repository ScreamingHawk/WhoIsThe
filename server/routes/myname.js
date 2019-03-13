const log = require('../logger')

module.exports = (io, socket, store) => {
	socket.on('myname set', name => {
		log.debug(`User set name to ${name}`)
		let sock = store.sockets[socket]
		if (sock && sock.name && store.users[sock.name]){
			// Update user
			store.users[name] = store.users[sock.name]
			delete store.users[sock.name]
		} else {
			// Create new user
			store.users[name] = {
				active: true,
				titles: [],
			}
		}
		// Update socket name
		store.sockets[socket].name = name
		io.emit('users is', store.users)
	})
}
