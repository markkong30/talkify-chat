import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserInfo } from '../utils/APIRoutes';

const Chat = () => {
	const navigate = useNavigate();

	useEffect(() => {
		axios({
			method: 'post',
			url: getUserInfo,
			data: {},
			withCredentials: true
		})
			.then(({ data }) => {
				console.log(data.user);
			})
			.catch(() => {
				navigate('/signin');
			});
	}, [navigate]);

	return <div></div>;
};

export default Chat;
