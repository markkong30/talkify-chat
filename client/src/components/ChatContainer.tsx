import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from '../types';
import { convertStringToBase64 } from '../utils/helpers';
import ChatInput from './ChatInput';
import Messages from './Messages';
import SignOut from './SignOut';

type Props = {
	currentChatUser: User;
};

const ChatContainer: React.FC<Props> = ({ currentChatUser }) => {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [newMessage, setNewMessage] = useState('');
	const sendMessage = (message: string) => {};

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
			<Messages />
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
