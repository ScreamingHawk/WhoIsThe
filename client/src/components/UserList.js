import React from 'react'
import styled from 'styled-components'

import User from './User'

const UserListWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;

	word-wrap: break-word;
`

const UserList = (props) => {
	const {
		users,
		currentTitle,
	} = props
	const currentUsers = users.sort((a, b) => a.active ? -1 : b.active ? 1 : 0)
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
