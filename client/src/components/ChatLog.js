import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import socket from '../global/socket'

const Wrapper = styled.ul`
	list-style: none;
	padding: 0;
`

const ChatLog = () => {
	const [chats, setChats] = useState([])

	useEffect(() => {
		// Listen for user list
		socket.on('chat new', chat => {
			const newChats = chats.slice(0)
			chat.ts = new Date(chat.ts)
			newChats.unshift(chat)
			setChats(newChats)
		})

		// Unsub
		return () => {
			socket.off('chat new')
		}
	})

	return (
		<Wrapper>
			{ chats && chats.map((chat, index) =>
				(
					<li key={index}>
						<strong>{chat.name}</strong>
						{' '}
						<small>{chat.ts.toLocaleTimeString()}</small>
						<br />
						<span>{chat.message}</span>
					</li>
				)
			)}
		</Wrapper>
	)
}

export default ChatLog
