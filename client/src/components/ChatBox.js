import React from 'react'
import styled from 'styled-components'

import ChatLog from './ChatLog'
import ChatSend from './ChatSend'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`

const FullHR = styled.hr`
	width: 90%;
`

const ChatBox = () => {
	return (
		<Wrapper>
			<FullHR />
			<ChatSend />
			<ChatLog />
		</Wrapper>
	)
}

export default ChatBox
