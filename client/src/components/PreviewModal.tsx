import React, { useState } from 'react';
import Modal from 'react-modal';
import styled, { useTheme } from 'styled-components';
import type { GlobalThemes } from '../styled.theme';
import { FaTimes } from 'react-icons/fa';
import ChatInput from './ChatInput';

type Props = {
	isOpen: boolean;
	closeModal: () => void;
	imageUrl: string;
	sendMessage: (message: string) => void;
	sendImage: (image: string) => void;
	preloadImage: (image: string) => void;
	isAIChat: boolean;
	openModal: () => void;
};

const PreviewModal: React.FC<Props> = ({
	isOpen,
	closeModal,
	sendImage,
	imageUrl,
	sendMessage,
	preloadImage,
	isAIChat,
	openModal
}) => {
	const theme = useTheme() as GlobalThemes;
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [newMessage, setNewMessage] = useState('');

	const customStyles = {
		overlay: {
			backgroundColor: theme.background.dark
		},
		content: {
			maxHeight: '100vh',
			overflow: 'hidden',
			display: 'flex',
			flexDirection: 'column' as 'column',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '0 5rem',
			borderRadius: '1rem',
			color: 'white',
			backgroundColor: theme.background.semiDark,
			width: '80vw',
			height: '100vh',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)'
		}
	};

	return (
		<div role="dialog" aria-modal>
			<Modal
				isOpen={isOpen}
				onRequestClose={closeModal}
				style={customStyles}
				ariaHideApp={false}
			>
				<Container>
					<img src={imageUrl} alt="" />
					<div className="input-comp">
						<ChatInput
							isAIChat={isAIChat}
							shouldShowImageUpload={false}
							sendMessage={sendMessage}
							showEmojiPicker={showEmojiPicker}
							setShowEmojiPicker={setShowEmojiPicker}
							newMessage={newMessage}
							setNewMessage={setNewMessage}
							sendImage={sendImage}
							preloadImage={preloadImage}
							openModal={openModal}
							shouldCheckInput={false}
						/>
					</div>
				</Container>

				<Cross>
					<FaTimes size={30} onClick={closeModal} />
				</Cross>
			</Modal>
		</div>
	);
};

const Container = styled.div`
	overflow: hidden;

	img {
		width: 100%;
		max-height: calc(100vh - 4.5rem);
		display: block;
	}

	.input-comp {
		width: 100%;
		/* height: 4.5rem; */
	}
`;

const Cross = styled.button`
	position: absolute;
	top: 15px;
	right: 15px;
	cursor: pointer;
	border: none;
	background-color: transparent;
	color: ${({ theme }) => theme.text.primary};
`;

export default PreviewModal;
