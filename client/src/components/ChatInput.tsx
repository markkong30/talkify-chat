import React from 'react';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import styled from 'styled-components';
import { Theme } from 'emoji-picker-react';

type Props = {
	sendMessage: (message: string) => void;
	showEmojiPicker: boolean;
	setShowEmojiPicker: (
		value: boolean | ((prevState: boolean) => boolean)
	) => void;
	newMessage: string;
	setNewMessage: (msg: string) => void;
};
const ChatInput: React.FC<Props> = ({
	sendMessage,
	showEmojiPicker,
	setShowEmojiPicker,
	newMessage,
	setNewMessage
}) => {
	const handleEmojiClick = (emoji: EmojiClickData) => {
		setNewMessage(newMessage + emoji.emoji);
		setShowEmojiPicker(false);
	};

	return (
		<Container>
			<div className="emoji">
				<BsEmojiSmileFill onClick={() => setShowEmojiPicker((prev) => !prev)} />
				{showEmojiPicker && (
					<div className="picker">
						<Picker theme={Theme.DARK} onEmojiClick={handleEmojiClick} />
					</div>
				)}
			</div>
			<form className="input">
				<input
					type="text"
					name="message"
					placeholder="type your message here"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<button className="submit" type="submit">
					<IoMdSend />
				</button>
			</form>
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-columns: 5% 95%;
	align-items: center;
	background-color: ${({ theme }) => theme.background.intenseDark};
	padding: 0 2rem 0.3rem;

	.emoji {
		position: relative;
		display: flex;
		align-items: center;
		color: ${({ theme }) => theme.text.primary};
		gap: 1rem;

		svg {
			font-size: 1.5rem;
			color: #ffff00c8;
			cursor: pointer;
		}

		.picker {
			position: absolute;
			bottom: 2rem;
		}
	}

	.input {
		display: flex;
		align-items: center;
		gap: 1rem;
		height: 2rem;

		input {
			height: 100%;
			flex-grow: 1;
			border-radius: 2rem;
			background-color: ${({ theme }) => theme.background.lightGray};
			color: ${({ theme }) => theme.text.primary};
			border: none;
			padding-left: 1rem;
			font-size: 1.2rem;

			&::selection {
				background-color: ${({ theme }) => theme.background.light};
			}

			&:focus {
				outline: none;
			}
		}

		.submit {
			height: 100%;
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
		}
	}
`;

export default ChatInput;
