const log = require('../logger')

module.exports = (io, socket, store) => {
	socket.on('title suggest', title => {
		log.info(`Title suggested: ${title}`)
		store.titleSuggestions.push(title)
	})
}
