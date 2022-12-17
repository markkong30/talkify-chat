import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Chat = () => {
	const navigate = useNavigate();
	const userData = useContext(UserContext);

	console.log(userData, !!userData?.setUser);

	useEffect(() => {
		if (!userData?.user && !userData?.isFetchingUser) {
			navigate('/signin');
		}
	}, [userData, navigate]);

	return <div></div>;
};

export default Chat;
