import axios from 'axios';
import { useState } from 'react';
import { Message } from '../../types';
import { getAIMessageAPI } from '../../utils/APIRoutes';

export const useAIChat = () => {
	const [AIMessages, setAIMessages] = useState<Message[]>([]);
	const [shouldType, setShouldType] = useState(false);
	const [fetchCount, setFetchCount] = useState(0);
	const [loadingAI, setLoadingAI] = useState(false);

	const getAIMessage = async (message: string) => {
		try {
			const { data } = await axios.post(getAIMessageAPI, {
				prompt: message
			});

			setAIMessages((prev) => [
				...prev.slice(0, prev.length - 1),
				{
					fromSelf: false,
					message: data.response.trim(),
					_id: data._id
				}
			]);

			setFetchCount(0);
		} catch (err) {
			console.log(err);
			if (fetchCount <= 3) {
				getAIMessage(message);
			}
		}
	};

	const sendAIMessage = (message: string) => {
		const messages = [
			{
				fromSelf: true,
				message,
				_id: crypto.randomUUID()
			},
			{
				fromSelf: false,
				message: '...',
				_id: crypto.randomUUID()
			}
		];

		setAIMessages((prev) => [...prev, ...messages]);

		setShouldType(true);
		setLoadingAI(true);
		getAIMessage(message);
	};

	return {
		AIMessages,
		getAIMessage,
		sendAIMessage,
		setShouldType,
		shouldType,
		loadingAI,
		setLoadingAI
	};
};
