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
	@media (max-width: ${({ theme }) => theme.breakPoint}) {
		flex-wrap: wrap;
	}
	> * {
		@media (min-width: ${({ theme }) => theme.breakPoint}) {
			width: 50%;
		}
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
	const [title, setTitle] = useState(null)

	useEffect(() => {
		// Listen for new titles
		socket.on('title set', setTitle)
		// Request user list
		if (title === null){
			socket.emit('title get')
		}

		// Unsub
		return () => {
			socket.off('title set')
		}
	})

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

	document.title = `Who is the ${title ? title+'?' : '...'}`

	return (
		<Wrapper>
			<Side>
				<TitleCurrent title={title} />
				<UserList users={users} currentTitle={title} />
			</Side>
			<Side>
				<TitleSuggest />
				<ChatBox />
			</Side>
		</Wrapper>
	)
}

export default PagePlay
