import React from 'react'
import styled from 'styled-components'

import User from './User'

const UserListWrapper = styled.div`
	display: flex;
	justify-content: space-around;
`

const UserList = (props) => {
	const {
		users,
		currentTitle,
	} = props
	const currentUsers = users.filter(u => u.active)
	return (
		<UserListWrapper>
			{ currentUsers && currentUsers.map(u => (
				<User
					key={u.id}
					currentTitle={currentTitle}
					{...u}
				/>
			))}
		</UserListWrapper>
	)
}

export default UserList
