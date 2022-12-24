import React, { useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { aiBotId } from '../pages/Chat/bot.helpers';
import { useAIChat } from '../pages/Chat/useAIChat';
import { useChat } from '../pages/Chat/useChat';
import { User } from '../types';
import AIBotMessages from './AIBotMessages';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import Messages from './Messages';

type Props = {
	user: User;
	currentChatUser: User;
	socket: Socket;
};

const ChatContainer: React.FC<Props> = ({ user, currentChatUser, socket }) => {
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [newMessage, setNewMessage] = useState('');
	const { messages, sendMessage } = useChat(
		user._id,
		currentChatUser._id,
		socket
	);
	const {
		AIMessages,
		sendAIMessage,
		setShouldType,
		shouldType,
		loadingAI,
		setLoadingAI
	} = useAIChat();

	return (
		<Container ref={chatContainerRef}>
			<ChatHeader currentChatUser={currentChatUser} />
			{currentChatUser._id === aiBotId ? (
				<AIBotMessages
					messages={AIMessages}
					setShouldType={setShouldType}
					shouldType={shouldType}
					setLoadingAI={setLoadingAI}
					loadingAI={loadingAI}
				/>
			) : (
				<Messages messages={messages} />
			)}
			<ChatInput
				isAIChat={currentChatUser._id === aiBotId}
				sendMessage={sendMessage}
				sendAIMessage={sendAIMessage}
				showEmojiPicker={showEmojiPicker}
				setShowEmojiPicker={setShowEmojiPicker}
				newMessage={newMessage}
				setNewMessage={setNewMessage}
				loadingAI={loadingAI}
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
