import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Chat from './pages/Chat/Chat';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { ToastContainer } from 'react-toastify';
import { globalThemes } from './styled.theme';
import SetAvatar from './pages/Avatar/SetAvatar';
import { UserInfo } from './context/UserContext';

function App() {
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
