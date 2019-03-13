import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import socket from './global/socket'
import PageWho from './pages/PageWho'

const App = () => {
	const [theme] = useState({
		background: "#DCDCDC",
		text: "#111111",
	})
	const [name, setName] = useState()

	useEffect(() => {
		// Listen for myname
		socket.on('myname is', myName => {
			console.log(`Setting name to ${myName}`)
			setName(myName)
		})
		// Listen for user list
		socket.on('users is', users => {
			console.log(`Users are ${JSON.stringify(users)}`)
		})

		// Unsub
		return () => {
			socket.off('myname is')
			socket.off('users is')
		}
	})

	let page = null
	if (!name){
		page = <PageWho />
	}

	return (
		<ThemeProvider theme={theme}>
			{page}
		</ThemeProvider>
	)
}

export default App;
