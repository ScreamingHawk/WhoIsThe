const log = require('../logger')

module.exports = (io, socket, store, common) => {
	socket.on('title suggest', title => {
		log.info(`Title suggested: ${title}`)
		store.titleSuggestions.push(title)
		common.systemMessage(title, 'was suggested')
	})
}
