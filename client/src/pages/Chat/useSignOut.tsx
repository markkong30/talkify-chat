import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Socket } from 'socket.io-client';
import { useUser } from '../../context/UserContext';
import { signOutAPI } from '../../utils/APIRoutes';

export const useSignOut = (socket: Socket) => {
	const navigate = useNavigate();
	const userData = useUser();

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
				socket.close();
			}
		} catch (err) {
			toast.error('Error... Please try again');
		} finally {
			navigate('/signin');
		}
	};

	return { handleSignOut };
};
