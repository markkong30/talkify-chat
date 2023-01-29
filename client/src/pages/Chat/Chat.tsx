import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../context/UserContext';
import Contacts from '../../components/chats/contacts/Contacts';
import { useContacts } from './useContacts';
import ChatContainer from '../../components/chats/ChatContainer';
import Spinner from '../../utils/Spinner';
import { SocketContext } from '../../context/SocketContext';
import Welcome from '../../components/chats/Welcome';

const Chat = () => {
	const userData = useContext(UserContext);
	const socketData = useContext(SocketContext);
	const { contacts } = useContacts(!!userData?.user, socketData?.socket);
	const [currentChatUserId, setCurrentChatUserId] = useState('');
	const currentChatUser = contacts?.find(
		(contact) => contact._id === currentChatUserId
	);

	if (!userData?.user || !socketData?.socket) return <Spinner />;

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
					<ChatContainer
						user={userData.user}
						currentChatUser={currentChatUser}
						socket={socketData?.socket}
					/>
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
