import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { useChat } from '../pages/Chat/useChat';
import { User } from '../types';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import Messages from './Messages';

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
			<ChatHeader currentChatUser={currentChatUser} />
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
	position: relative;
	display: flex;
	flex-direction: column;
	padding-top: 1rem;
	overflow: hidden;
`;

export default ChatContainer;
