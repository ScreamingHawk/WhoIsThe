import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import socket from '../global/socket'

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: middle;

	h1 {
		white-space: nowrap;
		margin: 0;

		small {
			font-size: 0.5em;
		}

		strong {
			color: ${({ theme }) => theme.highlight};
		}
	}
`

const TitleCurrent = () => {
	const [title, setTitle] = useState('')

	useEffect(() => {
		// Listen for new titles
		socket.on('title set', setTitle)

		// Unsub
		return () => {
			socket.off('title set')
		}
	})

	const content = title ? (
		<h1>
			Who is the
			{' '}
			<strong>{title}</strong>
			?
		</h1>
	) : (
		<h1>
			<small>
				Awaiting suggestion...
				{' '}
				<span role="img" aria-label="arrow right">👉</span>
			</small>
		</h1>
	)

	return (
		<Wrapper>
			{content}
		</Wrapper>
	)
}

export default TitleCurrent
