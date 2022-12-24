import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { User } from '../../types';
import { allUsersAPI } from '../../utils/APIRoutes';
import { Socket } from 'socket.io-client';
import { aiBotInfo } from './bot.helpers';

export const useContacts = (isUser: boolean, socket: Socket | undefined) => {
	const [contacts, setContacts] = useState<User[]>([]);

	useEffect(() => {
		if (socket) {
			socket.on('user-status-update', (data) => {
				// When the 'user-status-update' event is received, update the online status of the specified user
				console.log(data);
				getAllUsers();
				// updateUserOnlineStatus(userId);
			});
		}

		const getAllUsers = async () => {
			const { data } = await axios.get(allUsersAPI, {
				withCredentials: true
			});
			setContacts([aiBotInfo, ...data]);
		};

		if (isUser) {
			getAllUsers();
		}
	}, [isUser, socket]);

	const updateContacts = useCallback(
		(userId: string) => {
			const updatedContact = contacts.find((contact) => contact._id === userId);

			if (updatedContact) {
				setContacts([...contacts, { ...updatedContact, _id: userId }]);
			}
		},
		[contacts]
	);

	return {
		contacts
	};
};
