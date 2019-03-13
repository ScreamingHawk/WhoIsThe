const log = require('../logger')

module.exports = (io, socket, store) => {
	socket.on('myname set', name => {
		log.debug(`User set name to ${name}`)
		let sock = store.sockets[socket]
		if (sock && sock.name && store.users[sock.name]){
			// Update user
			store.users.find(u => u.name == sock.name).name = name
		} else {
			// Create new user
			store.users.push({
				name,
				active: true,
				titles: [],
			})
		}
		// Update socket name
		store.sockets[socket].name = name
		socket.emit('myname is', name)
		io.emit('users is', store.users)
	})
}
