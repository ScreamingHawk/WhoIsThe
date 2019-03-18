import React, { useState } from 'react'
import styled from 'styled-components'

import Input from '../components/base/Input'
import socket from '../global/socket'

const Wrapper = styled.form`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: middle;

	input {
		text-align: center;
	}
`

const PageWho = () => {
	const [name, setName] = useState('')

	const handleSubmit = e => {
		if (e){
			e.preventDefault()
		}
		if (name === ""){
			return
		}
		socket.emit('myname set', name)
	}

	return (
		<Wrapper onSubmit={handleSubmit}>
			<Input
				value={name}
				placeholder="Who are you ...?"
				onChange={e => setName(e.target.value)} />
		</Wrapper>
	)
}

export default PageWho
