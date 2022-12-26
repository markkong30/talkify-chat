import React from 'react';
import Modal from 'react-modal';
import styled, { useTheme } from 'styled-components';
import type { GlobalThemes } from '../styled.theme';
import { FaTimes } from 'react-icons/fa';

type Props = {
	isOpen: boolean;
	closeModal: () => void;
	handleConfirm: () => void;
	modalTitle: string;
};

const ModalComp: React.FC<Props> = ({
	isOpen,
	closeModal,
	handleConfirm,
	modalTitle
}) => {
	const theme = useTheme() as GlobalThemes;

	const customStyles = {
		overlay: {
			backgroundColor: theme.background.dark
		},
		content: {
			display: 'flex',
			flexDirection: 'column' as 'column',
			justifyContent: 'center',
			alignItems: 'center',
			gap: '3rem',
			padding: '5rem',
			borderRadius: '1rem',
			color: 'white',
			backgroundColor: theme.background.intenseDark,
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			transform: 'translate(-50%, -50%)'
		}
	};

	return (
		<div role="dialog" aria-modal>
			<Modal
				isOpen={isOpen}
				onRequestClose={closeModal}
				style={customStyles}
				ariaHideApp={false}
			>
				<h1 className="title" style={{ fontSize: 30 }}>
					{modalTitle}
				</h1>
				<Buttons>
					<button className="btn btn--confirm" onClick={handleConfirm}>
						Confirm
					</button>
					<button className="btn btn--close" onClick={closeModal}>
						No
					</button>
				</Buttons>
				<Cross>
					<FaTimes size={30} onClick={closeModal} />
				</Cross>
			</Modal>
		</div>
	);
};

const Buttons = styled.div`
	display: flex;
	gap: 3rem;

	.btn {
		font-size: 1rem;
		padding: 0.8rem 1.2rem;
		border: 1px solid ${({ theme }) => theme.border.gray};
		border-radius: 0.8rem;
		cursor: pointer;
		background-color: ${({ theme }) => theme.background.pureWhite};
		transition: all 0.3s ease-in-out;

		&:hover {
			background-color: ${({ theme }) => theme.background.lightGray};
			color: ${({ theme }) => theme.text.primary};
		}
	}
`;

const Cross = styled.button`
	position: absolute;
	top: 15px;
	right: 15px;
	cursor: pointer;
	border: none;
	background-color: transparent;
	color: ${({ theme }) => theme.text.primary};
`;

export default ModalComp;
