import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import UserList from '../components/UserList'
import TitleCurrent from '../components/TitleCurrent'
import TitleSuggest from '../components/TitleSuggest'
import ChatBox from '../components/ChatBox'
import socket from '../global/socket'

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	> * {
		width: 50%;
		padding: 8px;
	}
	justify-content: space-around;
	background-color: ${({ theme }) => theme.background};
`

const Side = styled.div`
	> * {
		margin-bottom: 10px;
		input {
			width: 100%;
		}
	}
`

const PagePlay = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		// Listen for user list
		socket.on('users is', sockUsers => {
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
			<Side>
				<TitleCurrent />
				<UserList users={users} />
			</Side>
			<Side>
				<TitleSuggest />
				<ChatBox />
			</Side>
		</Wrapper>
	)
}

export default PagePlay
