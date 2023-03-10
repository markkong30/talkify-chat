import React from 'react';
import styled, { css } from 'styled-components';
import { User } from '../../../types';
import logo from '../../../assets/logo.svg';
import { convertStringToBase64 } from '../../../utils/helpers';
import { aiBotId } from '../../../pages/Chat/bot.helpers';
import { AiFillStar } from 'react-icons/ai';

type Props = {
	contacts: User[];
	currentUser?: User;
	currentChatUserId: string;
	setCurrentChatUserId: (id: string) => void;
};

const Contacts: React.FC<Props> = ({
	contacts,
	currentUser,
	currentChatUserId,
	setCurrentChatUserId
}) => {
	if (!currentUser) return <div></div>;

	return (
		<Container>
			<div className="brand">
				<img src={logo} alt="Talkify logo" />
				<label>Talkify</label>
			</div>
			<div className="contacts">
				{contacts?.map((contact, i) => (
					<Contact
						isActive={currentChatUserId === contact._id}
						isOnline={contact.online}
						key={contact._id}
						onClick={() => setCurrentChatUserId(contact._id)}
					>
						<div className="avatar">
							<img src={convertStringToBase64(contact.avatar)} alt="avatar" />
						</div>
						<div className="username">
							<h3>{contact.username}</h3>
							{contact._id === aiBotId ? (
								<div className="bot-status">
									<AiFillStar color="gold" fontSize={20} />
								</div>
							) : (
								<div className="status" />
							)}
						</div>
					</Contact>
				))}
			</div>
			<div className="current-user">
				<div className="avatar">
					<img src={convertStringToBase64(currentUser.avatar)} alt="avatar" />
				</div>
				<div className="username">
					<h3>{currentUser.username}</h3>
				</div>
			</div>
		</Container>
	);
};

const statusBorder = css`
	border: 1px solid ${({ theme }) => theme.border.gray};
`;

const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	background-color: ${({ theme }) => theme.background.intenseDark};

	.brand {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		img {
			height: 2rem;
		}

		label {
			color: ${({ theme }) => theme.text.primary};
			text-transform: uppercase;
		}
	}

	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		gap: 0.8rem;
		::-webkit-scrollbar {
			width: 0.3rem;

			&-thumb {
				background-color: ${({ theme }) => theme.background.lightGray};

				width: 0.2rem;
				border-radius: 1rem;

				&:hover {
					background-color: ${({ theme }) => theme.background.darkWhite};
				}
			}
		}
	}

	.current-user {
		background-color: #0d0d30;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;

		.avatar {
			img {
				height: 4rem;
				max-inline-size: 100%;
			}
		}

		.username {
			h3 {
				color: ${({ theme }) => theme.text.primary};
			}
		}
	}

	@media (max-width: 1080px) {
		gap: 1rem;

		.username {
			h3 {
				font-size: 1rem;
			}
		}
	}
`;

type StyledProp = {
	isOnline: boolean;
	isActive: boolean;
};

const Contact = styled.div<StyledProp>`
	background-color: ${({ theme }) => theme.background.lightGray};
	min-height: 5rem;
	width: 90%;
	cursor: pointer;
	border-radius: 0.2rem;
	padding: 0.4rem;
	display: flex;
	align-items: center;
	gap: 1rem;
	transition: 0.3s ease-in-out;
	background-color: ${({ isActive, theme }) =>
		isActive && theme.background.light};

	.avatar {
		img {
			height: 3rem;
		}
	}

	.username {
		position: relative;

		h3 {
			color: ${({ theme }) => theme.text.primary};
		}

		.status {
			position: absolute;
			top: -15px;
			right: -20px;
			background: ${({ isOnline }) =>
				isOnline && 'linear-gradient(to right, #00ff00, #00cc00)'};
			border-radius: 50%;
			width: 15px;
			height: 15px;
			display: inline-block;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
			${({ isOnline }) => !isOnline && statusBorder}
		}

		.bot-status {
			position: absolute;
			top: -15px;
			right: -20px;
		}
	}
`;

export default Contacts;
