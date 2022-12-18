import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Welcome from '../../components/Welcome';
import { UserContext } from '../../context/UserContext';
import Contacts from '../../components/Contacts';
import { useContacts } from './useContacts';
import ChatContainer from '../../components/ChatContainer';

const Chat = () => {
	const navigate = useNavigate();
	const userData = useContext(UserContext);
	const { contacts } = useContacts(!!userData?.user);
	const [currentChatUserId, setCurrentChatUserId] = useState('');
	const currentChatUser = contacts?.find(
		(contact) => contact.id === currentChatUserId
	);

	useEffect(() => {
		if (userData?.isUserAbsent) {
			return navigate('/signin');
		}

		if (userData?.isAvatarAbsent) {
			return navigate('/pick-your-avatar');
		}
	}, [userData, navigate]);

	if (!userData?.user) return <div>Loading...</div>;

	return (
		<Container>
			<div className="main">
				<Contacts
					contacts={contacts}
					currentUser={userData?.user}
					currentChatUserId={currentChatUserId}
					setCurrentChatUserId={setCurrentChatUserId}
				/>
				{currentChatUser ? (
					<ChatContainer currentChatUser={currentChatUser} />
				) : (
					<Welcome currentUser={userData?.user} />
				)}
			</div>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	background-color: ${({ theme }) => theme.background.semiDark};

	.main {
		height: 85vh;
		width: 85vw;
		background-color: ${({ theme }) => theme.background.dark};
		display: grid;
		grid-template-columns: 25% 75%;

		@media (max-width: 1080px) {
			grid-template-columns: 35% 65%;
		}

		@media (max-width: 720px) {
			grid-template-columns: 40% 60%;
		}
	}
`;

export default Chat;
