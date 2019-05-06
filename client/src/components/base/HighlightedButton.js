import styled from 'styled-components'

const HighlightedButton = styled.button`
	color: ${({ theme }) => theme.highlight};
	background: transparent;
	border: 2px solid ${({ theme }) => theme.highlight};
	border-radius: 8px;
	padding: 8px;
	font-size: 1.0em;

	:hover {
		font-weight: bold;
		border: 2px solid ${({ theme }) => theme.highlight};
	}

	:disabled {
		color: ${({ theme }) => theme.text};
		border: 2px solid ${({ theme }) => theme.text};
	}

	&.clicked {
		color: ${({ theme }) => theme.text};
		background: ${({ theme }) => theme.highlight}
	}
`

export default HighlightedButton
