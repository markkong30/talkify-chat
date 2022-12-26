import React from 'react';
import { BiPowerOff } from 'react-icons/bi';
import styled from 'styled-components';

type Props = {
	openModal: () => void;
};

const SignOut: React.FC<Props> = ({ openModal }) => {
	return (
		<Button onClick={openModal}>
			<BiPowerOff />
		</Button>
	);
};

const Button = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.background.light};
	cursor: pointer;
	border: none;

	svg {
		font-size: 1.5rem;
		color: ${({ theme }) => theme.text.primary};
	}
`;

export default SignOut;
