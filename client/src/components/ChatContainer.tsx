import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { useChat } from '../pages/Chat/useChat';
import { User } from '../types';
import { convertStringToBase64 } from '../utils/helpers';
import ChatInput from './ChatInput';
import Messages from './Messages';
import SignOut from './SignOut';

type Props = {
	user: User;
	currentChatUser: User;
	socket: Socket;
};

const ChatContainer: React.FC<Props> = ({ user, currentChatUser, socket }) => {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [newMessage, setNewMessage] = useState('');
	const { messages, sendMessage } = useChat(
		user._id,
		currentChatUser._id,
		socket
	);

	return (
		<Container>
			<div className="header">
				<div className="user-details">
					<div className="avatar">
						<img
							src={convertStringToBase64(currentChatUser.avatar)}
							alt="avatar"
						/>
					</div>
					<div className="username">
						<h3>{currentChatUser.username}</h3>
					</div>
				</div>
				<SignOut />
			</div>
			<Messages messages={messages} />
			<ChatInput
				sendMessage={sendMessage}
				showEmojiPicker={showEmojiPicker}
				setShowEmojiPicker={setShowEmojiPicker}
				newMessage={newMessage}
				setNewMessage={setNewMessage}
			/>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 1rem;
	overflow: hidden;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0 2rem;

		.user-details {
			display: flex;
			align-items: center;
			gap: 1rem;

			.avatar {
				img {
					height: 3rem;
				}
			}

			.username {
				h3 {
					color: ${({ theme }) => theme.text.primary};
				}
			}
		}
	}
`;

export default ChatContainer;
