import axios from 'axios';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import PreviewModal from '../../components/PreviewModal';
import { Message, MessageModel } from '../../types';
import { getAllMessagesAPI, sendMessageAPI } from '../../utils/APIRoutes';

export const useChat = (userId: string, chatUserId: string, socket: Socket) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState('');

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
			socket.on('msg-receive', (data: MessageModel) => {
				updateMessages({
					fromSelf: false,
					message: data.message.text,
					image: data.message.image,
					_id: data._id
				});
			});
		}
	}, [socket, userId]);

	const updateMessages = (message: Message) => {
		setMessages((prev) => [...prev, message]);
	};

	const sendMessage = async (message: string) => {
		try {
			const { data } = await axios.post(sendMessageAPI, {
				from: userId,
				to: chatUserId,
				message: {
					text: message,
					image: imageUrl
				}
			});

			socket.emit('send-msg', {
				_id: data._id,
				from: data.sender,
				to: data.users.find((user: string) => user !== data.sender),
				message: data.message
			});

			updateMessages({
				fromSelf: true,
				message: data.message.text,
				image: data.message.image,
				_id: data._id
			});
		} catch (err) {
			console.log(err);
		} finally {
			setIsOpen(false);
			setImageUrl('');
		}
	};

	const sendImage = async (image: string) => {
		try {
			const { data } = await axios.post(sendMessageAPI, {
				from: userId,
				to: chatUserId,
				message: {
					image
				}
			});

			socket.emit('send-msg', {
				_id: data._id,
				from: data.sender,
				to: data.users.find((user: string) => user !== data.sender),
				message: data.message.image
			});

			updateMessages({
				fromSelf: true,
				message: data.message.image,
				_id: data._id
			});
		} catch (err) {
			console.log(err);
		}
	};

	const preloadImage = (image: string) => {
		setImageUrl(image);
		setIsOpen(true);
	};

	const openModal = () => setIsOpen(true);

	const RenderPreviewModal = () => (
		<PreviewModal
			isOpen={isOpen}
			closeModal={() => {
				setIsOpen(false);
				setImageUrl('');
			}}
			openModal={openModal}
			sendImage={sendImage}
			imageUrl={imageUrl}
			isAIChat={false}
			sendMessage={sendMessage}
			preloadImage={preloadImage}
		/>
	);

	return {
		messages,
		updateMessages,
		sendMessage,
		sendImage,
		preloadImage,
		RenderPreviewModal,
		openModal
	};
};
