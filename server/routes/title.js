const log = require('../logger')

const setCurrentTitle = (io, store, common) => {
	if (store.titleSuggestions.length == 0){
		log.warn('Attempted to set currentTitle with empty suggestions list')
		io.emit('title set', '')
		return
	}
	const title = store.titleSuggestions.shift()
	store.currentTitle = title
	log.debug(`Voting commencing on ${title}`)
	common.systemMessage('Who is the', title)
	io.emit('title set', title)
}

module.exports = (io, socket, store, common) => {
	socket.on('title suggest', title => {
		log.info(`Title suggested: ${title}`)
		store.titleSuggestions.push(title)
		common.systemMessage(title, 'was suggested')

		if (store.currentTitle === ''){
			// If there is no current title, use this one
			setCurrentTitle(io, store, common)
		}
	})
}
