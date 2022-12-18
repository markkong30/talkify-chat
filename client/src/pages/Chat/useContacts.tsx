import axios from 'axios';
import { useEffect, useState } from 'react';
import { allUsersAPI } from '../../utils/APIRoutes';

export const useContacts = (isUser: boolean) => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const getAllUsers = async () => {
			const { data } = await axios.get(allUsersAPI, {
				withCredentials: true
			});
			setContacts(data);
		};

		if (isUser) {
			getAllUsers();
		}
	}, [isUser]);

	return {
		contacts
	};
};
