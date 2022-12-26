import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Message } from '../../types';
import { getAIMessageAPI } from '../../utils/APIRoutes';
import { aiLoadingMessage } from './bot.helpers';

export const useAIChat = (username: string) => {
	const [AIMessages, setAIMessages] = useState<Message[]>([]);
	const [shouldType, setShouldType] = useState(true);
	const [fetchCount, setFetchCount] = useState(0);
	const [loadingAI, setLoadingAI] = useState(false);

	useEffect(() => {
		// set welcome message
		setTimeout(() => {
			setAIMessages([
				{
					fromSelf: false,
					message: `Hi ${username}, how can I help you today?`,
					_id: crypto.randomUUID()
				}
			]);
		}, 1500);
	}, [username]);

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
				setFetchCount((prev) => prev + 1);
				getAIMessage(message);
			} else {
				toast.error('Error occured, please try again!');
				setFetchCount(0);
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
				message: aiLoadingMessage,
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
