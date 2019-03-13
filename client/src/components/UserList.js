import React from 'react'
import styled from 'styled-components'

import User from './User'

const UserListWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;
`

const UserList = (props) => {
	const {
		users,
	} = props
	return (
		<UserListWrapper>
			{ users && users.map(u => (
				<User key={u.name} {...u}></User>
			))}
		</UserListWrapper>
	)
}

export default UserList
