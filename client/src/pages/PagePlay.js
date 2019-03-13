import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import UserList from '../components/UserList'
import TitleSuggest from '../components/TitleSuggest'
import ChatBox from '../components/ChatBox'
import socket from '../global/socket'

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	> * {
		width: 50%;
		margin: 0;
	}
	justify-content: space-around;
	background-color: ${({ theme }) => theme.background};
`

const RightSide = styled.div`
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
			<UserList users={users} />
			<RightSide>
				<TitleSuggest />
				<ChatBox />
			</RightSide>
		</Wrapper>
	)
}

export default PagePlay
