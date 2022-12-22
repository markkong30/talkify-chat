import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { hiddenAndShow } from '../utils/animations';

type Props = {
	handleClick: (isClick: boolean) => void;
};
const DownArrow: React.FC<Props> = ({ handleClick }) => {
	return (
		<Button
			variants={hiddenAndShow}
			initial="hidden"
			animate="show"
			exit="exit"
			onClick={() => handleClick(true)}
		>
			<div className="arrow">{'>'}</div>
		</Button>
	);
};

const Button = styled(motion.button)`
	position: absolute;
	bottom: 4rem;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.background.pureWhite};
	width: 45px;
	height: 45px;
	border-radius: 100%;
	cursor: pointer;
	border: none;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

	.arrow {
		transform: rotate(90deg);
		font-size: 2rem;
		font-weight: 300;
		color: ${({ theme }) => theme.text.dark};
	}
`;

export default DownArrow;
