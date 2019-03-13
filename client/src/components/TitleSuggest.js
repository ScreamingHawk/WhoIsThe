import React, { useState } from 'react'
import styled from 'styled-components'

import Input from './base/Input'
import socket from '../global/socket'

const Wrapper = styled.form`
	display: flex;
	justify-content: center;
	align-items: middle;
	background-color: ${({ theme }) => theme.background};
`

const TitleSuggest = () => {
	const [title, setTitle] = useState('')

	const handleSubmit = e => {
		if (e){
			e.preventDefault()
		}
		if (title === ""){
			return
		}
		socket.emit('title suggest', title)
		setTitle('')
	}

	return (
		<Wrapper onSubmit={handleSubmit}>
			<Input
				value={title}
				placeholder="Suggest title ...?"
				onChange={e => setTitle(e.target.value)} />
		</Wrapper>
	)
}

export default TitleSuggest
