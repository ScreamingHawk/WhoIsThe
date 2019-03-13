import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import socket from '../global/socket'

const Wrapper = styled.ul`
	list-style: none;
	padding: 4px;
	p {
		word-wrap: break-word;
	}
`

const ChatLog = () => {
	const [chats, setChats] = useState([])

	useEffect(() => {
		// Listen for user chat
		socket.on('chat new', chat => {
			const newChats = chats.slice(0)
			chat.ts = new Date(chat.ts)
			chat.message = (
				<p>{chat.message}</p>
			)
			newChats.unshift(chat)
			setChats(newChats)
		})
		// Listen for system chat
		socket.on('chat system', chat => {
			const newChats = chats.slice(0)
			chat.ts = new Date(chat.ts)
			chat.name = 'SYSTEM'
			chat.message = (
				<p><i>{chat.item}</i> {chat.message}</p>
			)
			newChats.unshift(chat)
			setChats(newChats)
		})

		// Unsub
		return () => {
			socket.off('chat new')
			socket.off('chat system')
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
						{chat.message}
					</li>
				)
			)}
		</Wrapper>
	)
}

export default ChatLog
