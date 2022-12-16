import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Chat from './pages/Chat';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { globalThemes } from './styled.theme';

function App() {
	return (
		<ThemeProvider theme={globalThemes}>
			<BrowserRouter>
				<Routes>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/" element={<Chat />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
