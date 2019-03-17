import React, { useState } from 'react'
import styled from 'styled-components'

import Input from './base/Input'
import socket from '../global/socket'

const Wrapper = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: middle;
	background-color: ${({ theme }) => theme.background};

	h1 {
		white-space: nowrap;
		margin: 0;
	}
`

const placeholders = [
	'Coolest Guy',
	'Biggest Weeb',
	'Person You Would Date',
	'Rudest Dude',
	'Boss Of This Gym',
	'Very Powerful Mod',
	'Best Boi',
	'Music Spamlord',
	'Fascist',
	'ISTJ',
]

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

	const placeholder = placeholders[Math.floor(Math.random() * placeholders.length)] + '?'

	return (
		<Wrapper onSubmit={handleSubmit}>
			<h1>Who is the ...&nbsp;</h1>
			<Input
				value={title}
				placeholder={placeholder}
				onChange={e => setTitle(e.target.value)} />
		</Wrapper>
	)
}

export default TitleSuggest
