const log = require('../util/logger')
const { toTitleCase } = require('../util/textHelper')

let io = null
let store = null
let common = null

const setCurrentTitle = () => {
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

const doWinTitle = () => {
	clearDoWinTimer()
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
	// Find winners
	const winners = []
	for (let [votedForId, count] of Object.entries(counts)){
		if (count == largest){
			winners.push(store.users.find(u => u.id === votedForId))
		}
	}
	// Add titles
	const title = store.currentTitle
	winners.forEach(w => {
		w.titles.push(title)
		io.emit('title add', w, title)
	})
	// Send result
	const winnerNames = winners.length > 1 ?
		winners.reduce((a, val, i, arr) => {
				if (i == 0){
					return val.name
				}
				return a + (i < arr.length -1 ? ', ' : ' and ') + val.name
			}
		, '') : winners[0].name
	const isAre = winners.length > 1 ? 'are' : 'is'
	common.systemMessage(winnerNames, `${isAre} the ${title}!`)
	common.sendUsers()

	// Next one
	setCurrentTitle()
}

// Time out the question
let doWinTimer = null
const clearDoWinTimer = () => {
	if (doWinTimer){
		clearTimeout(doWinTimer)
	}
}
const startDoWinTimer = () => {
	clearDoWinTimer()
	doWinTimer = setTimeout(() => {
		doWinTitle()
	}, 10000)
}

module.exports = (ioIn, socket, storeIn, commonIn) => {
	io = ioIn
	store = storeIn
	common = commonIn
	init(socket)
}

const init = socket => {
	// Get current title
	socket.on('title get', () => {
		socket.emit('title set', store.currentTitle)
	})

	// Get title suggestion
	socket.on('title suggest', title => {
		title = toTitleCase(title)
		log.info(`Title suggested: ${title}`)
		if (!store.allSuggestions.find(t => t == title)){
			store.allSuggestions.push(title)
			store.titleSuggestions.push(title)
			common.systemMessage(title, 'was suggested')

			if (store.currentTitle === ''){
				// If there is no current title, use this one
				setCurrentTitle(io, store, common)
			}
		} else {
			log.warn('Attempt to suggest duplicate title')
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
			startDoWinTimer()
		}

		// Test voting completed
		if (store.currentVotes.length === common.countActiveUsers()){
			doWinTitle(io, store, common)
		}
	})
}
