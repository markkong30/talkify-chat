import React from 'react';
import styled from 'styled-components';
import { User } from '../../types';
import { convertStringToBase64, getRelativeTime } from '../../utils/helpers';
import SignOut from './SignOut';

type Props = {
	currentChatUser: User;
	openModal: () => void;
};

const ChatHeader: React.FC<Props> = ({ currentChatUser, openModal }) => {
	return (
		<Container>
			<div className="user-details">
				<div className="avatar">
					<img
						src={convertStringToBase64(currentChatUser.avatar)}
						alt="avatar"
					/>
				</div>
				<div className="text">
					<h3 className="username">{currentChatUser.username}</h3>
					<p className="status">
						{currentChatUser.online
							? 'online'
							: getRelativeTime(currentChatUser.lastSeen)}
					</p>
				</div>
			</div>
			<SignOut openModal={openModal} />
		</Container>
	);
};

const Container = styled.div`
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

		.text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 0.2rem;
			color: ${({ theme }) => theme.text.primary};

			.status {
				font-size: 0.9rem;
			}
		}
	}
`;

export default ChatHeader;
