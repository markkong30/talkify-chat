import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { aiBotId } from '../pages/Chat/bot.helpers';
import { useAIChat } from '../pages/Chat/useAIChat';
import { useChat } from '../pages/Chat/useChat';
import { useSignOut } from '../pages/Chat/useSignOut';
import { User } from '../types';
import ModalComp from '../utils/Modal';
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
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const { handleSignOut } = useSignOut(socket);
	const [newMessage, setNewMessage] = useState('');
	const {
		messages,
		sendMessage,
		sendImage,
		preloadImage,
		RenderPreviewModal,
		openModal
	} = useChat(user._id, currentChatUser._id, socket);
	const {
		AIMessages,
		sendAIMessage,
		setShouldType,
		shouldType,
		loadingAI,
		setLoadingAI
	} = useAIChat(user.username);

	return (
		<Container>
			<ChatHeader
				currentChatUser={currentChatUser}
				openModal={() => setIsOpenModal(true)}
			/>
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
				shouldShowImageUpload={true}
				sendMessage={sendMessage}
				sendAIMessage={sendAIMessage}
				showEmojiPicker={showEmojiPicker}
				setShowEmojiPicker={setShowEmojiPicker}
				newMessage={newMessage}
				setNewMessage={setNewMessage}
				sendImage={sendImage}
				preloadImage={preloadImage}
				loadingAI={loadingAI}
				openModal={openModal}
			/>
			<ModalComp
				modalTitle="Are you sure to sign out?"
				isOpen={isOpenModal}
				closeModal={() => setIsOpenModal(false)}
				handleConfirm={handleSignOut}
			/>
			<RenderPreviewModal />
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
