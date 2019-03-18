import React from 'react'
import styled from 'styled-components'

import Input from './Input'

const SendableStyle = styled.div`
	display: flex;
	flex-direction: row;
	justify-items: middle;
`

const Submit = styled.input`
	color: ${({ theme }) => theme.text};
	background: transparent;
	border: none;
	cursor: pointer;
	@media (min-width: ${({ theme }) => theme.breakPoint}) {
		display: none;
	}
`;

const SendableInput = props => {
	return (
		<SendableStyle>
			<Input {...props} />
			<Submit type="submit" aria-label="" value="✅" />
		</SendableStyle>
	)
}

export default SendableInput
