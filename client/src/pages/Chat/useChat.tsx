import axios from 'axios';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Message } from '../../types';
import {
	getAllMessagesAPI,
	sendMessageAPI,
	updateOnlineStatusAPI
} from '../../utils/APIRoutes';

export const useChat = (userId: string, chatUserId: string, socket: Socket) => {
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

	useEffect(() => {
		if (socket) {
			socket.on('msg-receive', (message: Message) => {
				updateMessages({
					fromSelf: false,
					message: message.message,
					_id: message._id
				});
			});

			socket.on('disconnect', () => {
				console.log('disconnected from the server');
				socket.emit('client-disconnect', userId);
				updateUserOnlineStatus(userId);
			});
		}
	}, [socket, userId]);

	const updateUserOnlineStatus = async (userId: string) => {
		const { data } = await axios.put(
			updateOnlineStatusAPI,
			{ userId },
			{ withCredentials: true }
		);
		console.log(data);
	};

	const updateMessages = (message: Message) => {
		setMessages((prev) => [...prev, message]);
	};

	const sendMessage = async (message: string) => {
		try {
			const { data } = await axios.post(sendMessageAPI, {
				from: userId,
				to: chatUserId,
				message
			});

			socket.emit('send-msg', {
				_id: data._id,
				from: data.sender,
				to: data.users.find((user: string) => user !== data.sender),
				message: data.message.text
			});

			updateMessages({
				fromSelf: true,
				message: data.message.text,
				_id: data._id
			});
		} catch (err) {
			console.log(err);
		}
	};

	return { messages, updateMessages, sendMessage };
};
