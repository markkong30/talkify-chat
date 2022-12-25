import React from 'react';
import styled from 'styled-components';
import loader from '../assets/loader.gif';

const Spinner = () => {
	return (
		<Container>
			<img src={loader} alt="loading" className="loader" />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 3rem;
	background-color: ${({ theme }) => theme.background.semiDark};
	height: 100vh;
	width: 100vw;

	.loader {
		max-inline-size: 100%;
	}
`;

export default Spinner;
