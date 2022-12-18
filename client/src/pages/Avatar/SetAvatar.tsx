import axios from 'axios';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAvatarAPI, setAvatarAPI } from '../../utils/APIRoutes';
import loader from '../../assets/loader.gif';
import { Buffer } from 'buffer';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { convertStringToBase64 } from '../../utils/helpers';

const SetAvatar: React.FC = () => {
	const navigate = useNavigate();
	const userData = useContext(UserContext);

	const [avatars, setAvatars] = useState([]);
	const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (userData?.isUserAbsent) return navigate('/signin');
		if (!userData?.isAvatarAbsent) return navigate('/');

		const setAvatarsFunc = async () => {
			const avatars: any = [];

			for (let i = 0; i < 4; i++) {
				const { data } = await axios.get(getAvatarAPI());

				const buffer = new Buffer(data);
				avatars.push(buffer.toString('base64'));
			}
			setAvatars(avatars);
			setIsLoading(false);
		};

		setAvatarsFunc();
	}, [userData, navigate]);

	const setProfileImage = async () => {
		if (!userData?.user || typeof selectedAvatar !== 'number') return;

		const { data } = await axios.post(setAvatarAPI(userData?.user?.id), {
			image: avatars[selectedAvatar]
		});

		if (data?.user?.hasAvatar) {
			userData.setUser(data.user);
			toast('Welcome to Talkify 🦄');

			navigate('/');
		} else {
			toast.error('Error... Please try again!');
		}
	};

	if (isLoading) {
		return (
			<Container>
				<img src={loader} alt="loading" className="loader" />
			</Container>
		);
	}

	return (
		<>
			<Container>
				<div className="title">
					<h1>Pick an avatar as your profile image</h1>
				</div>
				<div className="avatars">
					{avatars.map((avatar, i) => (
						<div
							key={i}
							className={classNames(
								'avatar',
								selectedAvatar === i && 'avatar--selected'
							)}
							onClick={() => setSelectedAvatar(i)}
						>
							<img src={convertStringToBase64(avatar)} alt="avatar" />
						</div>
					))}
				</div>
				<button
					className={classNames(
						'btn-submit',
						selectedAvatar ?? 'btn-submit--disabled'
					)}
					type="submit"
					onClick={setProfileImage}
				>
					Set as Profile Image
				</button>
			</Container>
		</>
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

	.title {
		h1 {
			color: ${({ theme }) => theme.text.primary};
		}
	}

	.avatars {
		display: flex;
		gap: 2rem;

		.avatar {
			border: 0.4rem solid transparent;
			padding: 0.4rem;
			border-radius: 5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: 0.5s all ease-in-out;
			cursor: pointer;

			img {
				height: 6rem;
			}

			&--selected {
				border: 0.4rem solid ${({ theme }) => theme.border.primary};
			}
		}
	}

	.btn-submit {
		background-color: ${({ theme }) => theme.background.primary};
		color: ${({ theme }) => theme.text.primary};
		padding: 1rem 2rem;
		border: none;
		font-weight: bold;
		cursor: pointer;
		border-radius: 0.4rem;
		font-size: 1rem;
		text-transform: uppercase;
		transition: all 0.3s ease-in-out;

		&--disabled {
			cursor: not-allowed;
			background-color: ${({ theme }) => theme.background.light};
		}

		&:hover {
			background-color: ${({ theme }) => theme.background.light};
		}
	}
`;

export default SetAvatar;
