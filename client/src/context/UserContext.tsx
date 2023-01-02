import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { User, UserContextValue } from '../types';
import { getUserInfo } from '../utils/APIRoutes';

export const UserContext = createContext<UserContextValue>(undefined);

type Props = { children: ReactNode };

export const UserInfo: React.FC<Props> = ({ children }) => {
	const socket = io(process.env.REACT_APP_SOCKET || '');
	const [user, setUser] = useState<User>();
	const [isFetchingUser, setIsFetchingUser] = useState(true);
	const isUserAbsent = !user && !isFetchingUser;
	const isAvatarAbsent = !user?.hasAvatar && !isFetchingUser;

	useEffect(() => {
		axios({
			method: 'post',
			url: getUserInfo,
			withCredentials: true
		})
			.then(({ data }) => {
				setUser(data.user);
			})
			.catch((err) => {
				console.log(err);
				setIsFetchingUser(false);
			})
			.finally(() => {
				setIsFetchingUser(false);
			});
	}, []);

	return (
		<UserContext.Provider
			value={{
				socket,
				user,
				setUser,
				isFetchingUser,
				isUserAbsent,
				isAvatarAbsent
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
