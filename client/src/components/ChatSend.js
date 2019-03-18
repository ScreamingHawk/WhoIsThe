import React, { useState } from 'react'
import styled from 'styled-components'

import SendableInput from './base/SendableInput'
import socket from '../global/socket'

const Wrapper = styled.form`
	display: flex;
	justify-content: center;
	align-items: middle;
	background-color: ${({ theme }) => theme.background};

	div {
		flex-grow: 1;
	}
`

const ChatSend = () => {
	const [message, setMessage] = useState('')

	const handleSubmit = e => {
		if (e){
			e.preventDefault()
		}
		if (message === ""){
			return
		}
		socket.emit('chat send', message)
		setMessage('')
	}

	return (
		<Wrapper onSubmit={handleSubmit}>
			<SendableInput
				value={message}
				placeholder="Chat..."
				onChange={e => setMessage(e.target.value)} />
		</Wrapper>
	)
}

export default ChatSend
