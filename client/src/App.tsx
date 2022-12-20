import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Chat from './pages/Chat/Chat';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { ToastContainer } from 'react-toastify';
import { globalThemes } from './styled.theme';
import SetAvatar from './pages/Avatar/SetAvatar';
import { UserInfo } from './context/UserContext';
import { EventEmitter } from 'events';

function App() {
	useEffect(() => {
		const emitter = new EventEmitter();

		// Increase the value of the defaultMaxListeners property to 100
		emitter.setMaxListeners(100);

		// Add a listener to the emitter
		emitter.on('myEvent', () => {
			console.log('myEvent was emitted');
		});
	}, []);

	return (
		<UserInfo>
			<ThemeProvider theme={globalThemes}>
				<BrowserRouter>
					<Routes>
						<Route path="/signup" element={<SignUp />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/pick-your-avatar" element={<SetAvatar />} />
						<Route path="/" element={<Chat />} />
					</Routes>
				</BrowserRouter>
				<ToastContainer theme="dark" />
			</ThemeProvider>
		</UserInfo>
	);
}

export default App;
