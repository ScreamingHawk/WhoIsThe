import React, { useState } from 'react'
import styled from 'styled-components'

import Input from '../components/base/Input'

const Wrapper = styled.form`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: middle;
	background-color: ${({ theme }) => theme.background};
`;

function PageWho() {
	const [name, setName] = useState('')

	function handleSubmit(e) {
		if (e){
			e.preventDefault();
		}
		if (name === ""){
			return
		}
		console.log(name)
		// TODO Send name
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
