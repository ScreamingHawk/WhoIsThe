import React from 'react'
import styled from 'styled-components'

import HighlightedButton from './base/HighlightedButton'

import socket from '../global/socket'

const UserWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 200px;
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 8px;
	padding: 8px;
	justify-content: center;
	align-items: middle;
	text-align: center;
`

const User = (props) => {
	const {
		name,
		id,
	} = props

	const sendVote = e => {
		if (e){
			e.preventDefault()
		}
		console.log(`Logging vote for ${name}`)
		socket.emit('title vote', id)
	}

	return (
		<UserWrapper>
			<p>{name}</p>
			<HighlightedButton onClick={sendVote}>
				{name} is!!
			</HighlightedButton>
		</UserWrapper>
	)
}

export default User
