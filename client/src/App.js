import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import socket from './global/socket'
import PageWho from './pages/PageWho'
import PagePlay from './pages/PagePlay'

const App = () => {
	const [theme] = useState({
		background: "#DCDCDC",
		text: "#111111",
		border: "#AAAAAA",
	})
	const [name, setName] = useState()

	useEffect(() => {
		// Listen for myname
		socket.on('myname is', myName => {
			console.log(`Setting name to ${myName}`)
			setName(myName)
		})

		// Unsub
		return () => {
			socket.off('myname is')
		}
	})

	let page = null
	if (!name){
		page = <PageWho />
	} else {
		page = <PagePlay myName={name} />
	}

	return (
		<ThemeProvider theme={theme}>
			{page}
		</ThemeProvider>
	)
}

export default App;
