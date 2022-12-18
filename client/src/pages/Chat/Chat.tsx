import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../context/UserContext';

const Chat = () => {
	const navigate = useNavigate();
	const userData = useContext(UserContext);

	useEffect(() => {
		if (userData?.isUserAbsent) {
			return navigate('/signin');
		}

		if (userData?.isAvatarAbsent) {
			return navigate('/pick-your-avatar');
		}
	}, [userData, navigate]);

	return (
		<Container>
			<div className="main">hi</div>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	background-color: ${({ theme }) => theme.background.semiDark};

	.main {
		height: 85vh;
		width: 85vw;
		background-color: ${({ theme }) => theme.background.dark};
		display: grid;
		grid-template-columns: 25% 75%;

		@media (max-width: 1080px) {
			grid-template-columns: 35% 65%;
		}

		@media (max-width: 720px) {
			grid-template-columns: 40% 60%;
		}
	}
`;

export default Chat;
