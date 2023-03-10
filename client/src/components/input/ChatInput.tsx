import React, { useEffect, useRef } from 'react';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill, BsImageFill } from 'react-icons/bs';
import styled from 'styled-components';
import { Theme } from 'emoji-picker-react';
import TextareaAutosize from 'react-textarea-autosize';
import noop from 'lodash/noop';

type Props = {
	sendMessage: (message: string) => void;
	preloadImage: (image: string) => void;
	sendAIMessage?: (message: string) => void;
	showEmojiPicker: boolean;
	setShowEmojiPicker: (
		value: boolean | ((prevState: boolean) => boolean)
	) => void;
	newMessage: string;
	setNewMessage: (msg: string) => void;
	isAIChat: boolean;
	loadingAI?: boolean;
	shouldShowImageUpload?: boolean;
	shouldCheckInput?: boolean;
};
const ChatInput: React.FC<Props> = ({
	sendMessage,
	sendAIMessage = noop,
	preloadImage,
	showEmojiPicker,
	setShowEmojiPicker,
	newMessage,
	setNewMessage,
	isAIChat,
	loadingAI,
	shouldShowImageUpload = false,
	shouldCheckInput = true
}) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const pickerRef = useRef<HTMLDivElement>(null);
	const menuHandlerRef = useRef<HTMLDivElement>(null);
	const showImageUpload = !isAIChat && shouldShowImageUpload;

	useEffect(() => {
		const autoClose = (e: PointerEvent) => {
			const target = e.target as Node;

			if (showEmojiPicker) {
				if (
					!pickerRef.current?.contains(target) &&
					!menuHandlerRef.current?.contains(target)
				) {
					setShowEmojiPicker(false);
					inputRef.current?.focus();
				}
			}
		};

		window.addEventListener('click', autoClose);

		return () => {
			window.removeEventListener('click', autoClose);
		};
	}, [showEmojiPicker]);

	const handleEmojiClick = (emoji: EmojiClickData) => {
		setNewMessage(newMessage + emoji.emoji);

		inputRef.current?.focus();
	};

	const handleSubmit = (
		e:
			| React.FormEvent<HTMLFormElement>
			| React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		e.preventDefault();
		if (!newMessage.trim().length && shouldCheckInput) return;

		if (isAIChat) {
			sendAIMessage(newMessage);
		} else {
			sendMessage(newMessage);
		}
		setNewMessage('');
	};

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		const image = e.target.files && e.target.files[0];
		reader.onloadend = () => {
			preloadImage(reader.result as string);
			e.target.value = '';
		};

		if (image) {
			reader.readAsDataURL(image);
		}
	};

	return (
		<Container>
			<div className="menu-left" ref={menuHandlerRef}>
				<BsEmojiSmileFill onClick={() => setShowEmojiPicker((prev) => !prev)} />
				{showEmojiPicker && (
					<div className="picker" ref={pickerRef}>
						<Picker theme={Theme.DARK} onEmojiClick={handleEmojiClick} />
					</div>
				)}
				{showImageUpload && (
					<div className="image-upload">
						<label htmlFor="file-input">
							<BsImageFill />
						</label>
						<input
							type="file"
							id="file-input"
							accept="image/*"
							onChange={handleUpload}
						/>
					</div>
				)}
			</div>
			<form className="input" onSubmit={handleSubmit}>
				<TextareaAutosize
					ref={inputRef}
					autoFocus
					className="textarea"
					name="message"
					placeholder="type your message here"
					autoComplete="off"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							handleSubmit(e);
						}
					}}
				/>
				<button
					className="submit"
					type="submit"
					disabled={isAIChat && loadingAI ? true : false}
				>
					<IoMdSend />
				</button>
			</form>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	gap: 1.5rem;
	align-items: center;
	background-color: ${({ theme }) => theme.background.intenseDark};
	padding: 0.5rem 2rem;

	.menu-left {
		position: relative;
		display: flex;
		align-items: center;
		color: ${({ theme }) => theme.text.primary};
		gap: 1.5rem;

		svg {
			font-size: 1.5rem;
			color: #ffff00c8;
			cursor: pointer;
		}

		.picker {
			position: absolute;
			bottom: 3rem;
		}

		//emoji-picker-react
		.EmojiPickerReact {
			background-color: ${({ theme }) => theme.background.intenseDark};
			box-shadow: 0 5px 10px ${({ theme }) => theme.background.light};
			border-color: ${({ theme }) => theme.background.light};
			.epr-body::-webkit-scrollbar {
				background-color: #080420;
				width: 5px;
				&-thumb {
					background-color: ${({ theme }) => theme.background.light};
				}
			}

			.epr-search {
				background-color: transparent;
				border-color: #9a86f3;
			}
		}

		.image-upload {
			font-size: 3rem;
			color: #ffff00c8;
			position: relative;

			label {
				position: absolute;
				top: 0;
				left: 0;
				cursor: pointer;
			}

			input {
				width: 1.5rem;
				height: 0;
			}
		}
	}

	.input {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex: 1;

		.textarea {
			flex-grow: 1;
			border-radius: 2rem;
			background-color: ${({ theme }) => theme.background.lightGray};
			color: ${({ theme }) => theme.text.primary};
			border: none;
			font-size: 1.2rem;
			resize: none;
			padding: 1rem;
			display: flex;
			align-items: center;

			&:focus {
				outline: none;
			}
		}

		.submit {
			height: 3.2rem;
			padding: 0.3rem 1.5rem;
			border-radius: 2rem;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: ${({ theme }) => theme.background.light};
			border: none;
			cursor: pointer;

			svg {
				font-size: 1.5rem;
				color: ${({ theme }) => theme.text.primary};
			}

			&:disabled {
				cursor: not-allowed;
				background-color: ${({ theme }) => theme.background.lightPurple};
			}
		}
	}
`;

export default ChatInput;
