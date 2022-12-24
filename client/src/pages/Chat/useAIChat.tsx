import axios from 'axios';
import { useState } from 'react';
import { Message } from '../../types';
import { getAIMessageAPI } from '../../utils/APIRoutes';

export const useAIChat = (userId: string) => {
	const [AIMessages, setAIMessages] = useState<Message[]>([]);
	const [shouldType, setShouldType] = useState(false);

	const updateAIMessages = (message: Message) => {
		setAIMessages((prev) => [...prev, message]);
	};

	const getAIMessage = async (message: string) => {
		try {
			const { data } = await axios.post(getAIMessageAPI, {
				prompt: message
			});

			console.log(data);

			updateAIMessages({
				fromSelf: false,
				message: data.response,
				_id: data._id
			});
		} catch (err) {
			console.log(err);
			getAIMessage(message);
		}
	};

	const sendAIMessage = (message: string) => {
		updateAIMessages({
			fromSelf: true,
			message,
			_id: crypto.randomUUID()
		});

		setShouldType(true);
		getAIMessage(message);
	};

	return { AIMessages, getAIMessage, sendAIMessage, setShouldType, shouldType };
};
