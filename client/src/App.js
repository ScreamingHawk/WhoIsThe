import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import PageWho from './pages/PageWho'

class App extends Component {
	state = {
		theme: {
			background: "#DCDCDC",
			text: "#111111",
		},
	}

	render() {
		return (
			<ThemeProvider theme={this.state.theme}>
				<PageWho />
			</ThemeProvider>
		);
	}
}

export default App;
