const log = require('../logger')

module.exports = (io, socket, store) => {
	socket.on('users get', () => {
		socket.emit('users is', store.users)
	})
}
