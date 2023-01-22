import axios, { AxiosResponse } from 'axios';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from 'react';
import {
	User,
	UserContext as UserContextType,
	UserContextValue
} from '../types';
import { getUserInfo } from '../utils/APIRoutes';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from './SocketContext';

export const UserContext = createContext<UserContextValue>(undefined);

type Props = { children: ReactNode };

const fetchUser = async (): Promise<AxiosResponse> => {
	return await axios<User>({
		method: 'post',
		url: getUserInfo,
		withCredentials: true
	});
};

export const UserInfo: React.FC<Props> = ({ children }) => {
	const socketData = useContext(SocketContext);
	const navigate = useNavigate();
	const { isLoading: isFetchingUser } = useQuery({
		queryKey: ['user'],
		queryFn: fetchUser,
		onSuccess: ({ data }) => {
			setUser(data.user);
		},
		onError: () => {
			setUser(undefined);
		},
		retry: false
	});
	const [user, setUser] = useState<UserContextType['user']>(null);

	useEffect(() => {
		const isUserAbsent = !user && !isFetchingUser;
		const isAvatarAbsent = !user?.hasAvatar && !isFetchingUser;

		if (isUserAbsent) return navigate('/signin');
		if (isAvatarAbsent) return navigate('/choose-your-avatar');
		if (user) {
			socketData?.socket.open();
			socketData?.socket.emit('add-user', user._id);

			return navigate('/');
		}
	}, [user, socketData]);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				isFetchingUser
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
