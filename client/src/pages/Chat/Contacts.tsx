import React from 'react';
import styled from 'styled-components';
import { User } from '../../types';
import logo from '../../assets/logo.svg';
import classNames from 'classnames';
import { convertStringToBase64 } from '../../utils/helpers';

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
					<div
						className={classNames(
							'contact',
							currentChatUserId === contact.id && 'contact--active'
						)}
						key={contact.id}
						onClick={() => setCurrentChatUserId(contact.id)}
					>
						<div className="avatar">
							<img src={convertStringToBase64(contact.avatar)} alt="avatar" />
						</div>
						<div className="username">
							<h3>{contact.username}</h3>
						</div>
					</div>
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

const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	background-color: #080420;

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
					background-color: #c5c5c5;
				}
			}
		}

		.contact {
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

			&--active {
				background-color: ${({ theme }) => theme.background.light};
			}

			.avatar {
				img {
					height: 3rem;
				}
			}
		}

		.username {
			h3 {
				color: ${({ theme }) => theme.text.primary};
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

export default Contacts;
