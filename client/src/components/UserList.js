import React, { useState } from 'react'
import styled from 'styled-components'

import User from './User'

const UserListWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	word-wrap: break-word;
`

const CheckboxLabel = styled.label`
	display: inline-block;
	input {
		display: inline-block;
	}
`

const UserList = (props) => {
	const {
		users,
		currentTitle,
	} = props
	const [showInactive, setShowInactive] = useState(true)
	let currentUsers = users
	if (showInactive){
		// Move inactive users to the bottom
		currentUsers = users.sort((a, b) => a.active ? -1 : b.active ? 1 : 0)
	} else {
		// Hide inactive users
		currentUsers = currentUsers.filter(u => u.active)
	}
	return (
		<div>
			<CheckboxLabel for="showInactive">
				<input type="checkbox" id="showInactive"
					checked={showInactive} onClick={e => setShowInactive(e.target.checked)} />
				Show dead
			</CheckboxLabel>
			<UserListWrapper>
				{ currentUsers && currentUsers.map(u => (
					<User
						key={u.id}
						currentTitle={currentTitle}
						{...u}
					/>
				))}
			</UserListWrapper>
		</div>
	)
}

export default UserList
