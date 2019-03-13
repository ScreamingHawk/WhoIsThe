import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import UserList from '../components/UserList'
import TitleSuggest from '../components/TitleSuggest'
import socket from '../global/socket'

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	* {
		width: 50%;
		margin: 0;
	}
	justify-content: center;
	align-items: middle;
	background-color: ${({ theme }) => theme.background};
`

const PagePlay = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		// Listen for user list
		socket.on('users is', sockUsers => {
			console.log(`Users are ${JSON.stringify(users)}`)
			setUsers(sockUsers)
		})
		// Request user list
		if (!users.length){
			socket.emit('users get')
		}

		// Unsub
		return () => {
			socket.off('users is')
		}
	})

	return (
		<Wrapper>
			<UserList users={users} />
			<TitleSuggest />
		</Wrapper>
	)
}

export default PagePlay
