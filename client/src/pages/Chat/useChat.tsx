import axios from 'axios';
import { useEffect, useState } from 'react';
import { Message, User } from '../../types';
import { getAllMessagesAPI } from '../../utils/APIRoutes';

export const useChat = (userId: string, chatUserId: string) => {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		axios
			.post(getAllMessagesAPI, {
				from: userId,
				to: chatUserId
			})
			.then(({ data }) => {
				setMessages(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [userId, chatUserId]);

	return { messages };
};
