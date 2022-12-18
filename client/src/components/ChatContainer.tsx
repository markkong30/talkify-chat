import React from 'react';
import styled from 'styled-components';
import { User } from '../types';
import { convertStringToBase64 } from '../utils/helpers';
import SignOut from './SignOut';

type Props = {
	currentChatUser: User;
};

const ChatContainer: React.FC<Props> = ({ currentChatUser }) => {
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
			<div className="messages"></div>
			<div className="input"></div>
		</Container>
	);
};

const Container = styled.div`
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
