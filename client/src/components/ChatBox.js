import React from 'react'
import styled from 'styled-components'

import ChatLog from './ChatLog'
import ChatSend from './ChatSend'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	border: 1px solid ${({ theme }) => theme.border};
`

const ChatBox = () => {
	return (
		<Wrapper>
			<ChatSend />
			<ChatLog />
		</Wrapper>
	)
}

export default ChatBox
