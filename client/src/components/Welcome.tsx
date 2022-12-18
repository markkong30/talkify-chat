import React from 'react';
import styled from 'styled-components';
import robot from '../assets/robot.gif';
import { User } from '../types';

type Props = {
	currentUser: User;
};

const Welcome: React.FC<Props> = ({ currentUser }) => {
	return (
		<Container>
			<img src={robot} alt="" />
			<div className="text">
				<h1>
					Welcome
					<span>{currentUser.username} 🦄</span>
				</h1>
				<h2>Please select a chat to Start Messaging</h2>
			</div>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.text.primary};

	img {
		height: 20rem;
	}

	.text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		span {
			margin-left: 0.5rem;
			color: ${({ theme }) => theme.text.secondary};
		}
	}
`;

export default Welcome;
