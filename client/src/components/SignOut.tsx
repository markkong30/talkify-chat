import axios from 'axios';
import React, { useContext } from 'react';
import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import { signOutAPI } from '../utils/APIRoutes';

const SignOut = () => {
	const navigate = useNavigate();
	const userData = useContext(UserContext);

	const handleSignOut = async () => {
		try {
			const { data } = await axios.post(
				signOutAPI,
				{},
				{
					withCredentials: true
				}
			);
			if (data) {
				userData?.setUser(undefined);
			}
		} catch (err) {
			toast.error('Error... Please try again');
		} finally {
			navigate('/signin');
		}
	};
	return (
		<Button onClick={handleSignOut}>
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
