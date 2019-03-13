import React from 'react'
import styled from 'styled-components'

const UserWrapper = styled.div`
	display: flex;
	width: 200px;
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 8px;
	justify-content: center;
	align-items: middle;
`

const User = (props) => {
	const {
		name,
	} = props
	return (
		<UserWrapper>
			{name}
		</UserWrapper>
	)
}

export default User
