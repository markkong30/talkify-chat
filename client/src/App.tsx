import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/" element={<Chat />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
