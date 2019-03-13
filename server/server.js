const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const log = require('./logger')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const {
	configureChat,
	systemMessage,
} = require('./routes/chat')
const configureMyName = require('./routes/myname')
const configureTitle = require('./routes/title')
const configureUsers = require('./routes/users')

const clientFolder = path.join(__dirname, '..', 'client/build')

// Accept json
app.use(bodyParser.json())

// Serve static files
app.use(express.static(clientFolder))

let connectedCount = 0

const store = {
	users: [],
	titleSuggestions: [],
}
const common = {
	systemMessage: (item, message) => systemMessage(io, item, message),
}

io.on('connection', socket => {
	log.debug("A user connected")
	connectedCount++
	log.debug(`There are ${connectedCount} connected users`)

	socket.on('disconnect', () => {
		log.debug("A user disconnected")
		connectedCount--
		log.debug(`There are ${connectedCount} connected users`)
		// Deactivate user
		const user = store.users.find(u => u.id === socket.id)
		if (user){
			user.active = false
		}
		io.emit('users is', store.users)
	})

	configureChat(io, socket, store)
	configureMyName(io, socket, store, common)
	configureTitle(io, socket, store, common)
	configureUsers(io, socket, store)
})

// Fail over
app.get('*', (req, res)=>{
	res.sendFile(path.join(clientFolder, 'index.html'))
})

// Start up
const port = process.env.PORT || 5000
server.listen(port)

log.info(`Listing on port ${port}`)
