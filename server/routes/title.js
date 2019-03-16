const log = require('../util/logger')

const setCurrentTitle = (io, store, common) => {
	if (store.titleSuggestions.length == 0){
		log.warn('Attempted to set currentTitle with empty suggestions list')
		store.currentTitle = ''
		io.emit('title set', '')
		return
	}
	const title = store.titleSuggestions.shift()
	store.currentTitle = title
	store.currentVotes = []
	common.systemMessage('Who is the', title)
	io.emit('title set', title)
}

module.exports = (io, socket, store, common) => {
	// Get current title
	socket.on('title get', () => {
		socket.emit('title set', store.currentTitle)
	})

	// Get title suggestion
	socket.on('title suggest', title => {
		log.info(`Title suggested: ${title}`)
		store.titleSuggestions.push(title)
		common.systemMessage(title, 'was suggested')

		if (store.currentTitle === ''){
			// If there is no current title, use this one
			setCurrentTitle(io, store, common)
		}
	})

	// Get vote
	socket.on('title vote', userId => {
		if (!store.currentTitle){
			log.warn('Attempt to vote on no title')
			return
		}
		const votedBy = store.users.find(u => u.id === socket.id)
		const votedFor = store.users.find(u => u.id === userId)
		if (votedBy && votedFor){
			const message = `voted ${votedFor.name} as the ${store.currentTitle}`
			log.info(`${votedBy.name} ${message}`)
			const voteRecord = store.currentVotes.find(v => v.votedBy === votedBy.id)
			if (voteRecord){
				// Update existing vote
				voteRecord.votedFor = votedFor.id
			} else {
				// New vote
				store.currentVotes.push({
					votedBy: votedBy.id,
					votedFor: votedFor.id,
				})
			}
			common.systemMessage(votedBy.name, message)
		}

		// Test voting completed
		if (store.currentVotes.length === common.countActiveUsers()){
			// Count the votes
			const counts = {}
			let largest = 1
			for (let i = 0; i < store.currentVotes.length; i++){
				const v = store.currentVotes[i]
				if (counts[v.votedFor]){
					counts[v.votedFor]++
					if (counts[v.votedFor] > largest){
						largest = counts[v.votedFor]
					}
				} else {
					counts[v.votedFor] = 1
				}
			}
			const winners = []
			for (let [votedForId, count] of Object.entries(counts)){
				if (count == largest){
					winners.push(store.users.find(u => u.id === votedForId))
				}
			}
			const title = store.currentTitle
			winners.forEach(w => {
				w.titles.push(title)
				io.emit('title add', w, title)
			})
			const winnerNames = winners.length > 1 ?
				winners.reduce((a, val, i, arr) =>
					a + (i < arr.length -1 ? ', ' : ' and ') + val.name
				) : winners[0].name
			const isAre = winners.length > 1 ? 'are' : 'is'
			common.systemMessage(winnerNames, `${isAre} the ${title}!`)
			common.sendUsers()

			// Next one
			setCurrentTitle(io, store, common)
		}
	})
}
