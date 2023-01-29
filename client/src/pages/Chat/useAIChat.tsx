import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Message } from '../../types';
import { getAIImageAPI, getAIMessageAPI } from '../../utils/APIRoutes';
import { aiLoadingMessage, getWelcomeMessage } from './bot.helpers';

const isImage = (message: string) => !!message.match(/^\/imagine.*/g);

const fetchAI = async (prompt: string): Promise<AxiosResponse> => {
	const APIEndpoint = isImage(prompt) ? getAIImageAPI : getAIMessageAPI;
	const replacedPrompt = isImage(prompt)
		? prompt.replace(/\/imagine /g, '')
		: prompt;

	return await axios.post(APIEndpoint, {
		prompt: replacedPrompt
	});
};

export const useAIChat = (username: string) => {
	const [AIMessages, setAIMessages] = useState<Message[]>([]);
	const [shouldType, setShouldType] = useState(true);
	const [loadingAI, setLoadingAI] = useState(true);
	const { mutate } = useMutation({
		mutationFn: fetchAI,
		onSuccess: ({ data }) => {
			if (data.type === 'image') {
				setAIMessages((prev) => [
					...prev.slice(0, prev.length - 1),
					{
						fromSelf: false,
						message: data.prompt.trim(),
						image: data.response,
						_id: crypto.randomUUID()
					}
				]);
			} else {
				setAIMessages((prev) => [
					...prev.slice(0, prev.length - 1),
					{
						fromSelf: false,
						message: data.response.trim(),
						_id: data._id
					}
				]);
			}
		},
		onError: () => {
			toast.error('Error occured, please try again!');
			setAIMessages((prev) => [...prev.slice(0, prev.length - 1)]);
		},
		onSettled: () => {
			setLoadingAI(false);
		}
	});

	useEffect(() => {
		// set welcome message
		setTimeout(() => {
			setAIMessages([
				{
					fromSelf: false,
					message: getWelcomeMessage(username),
					_id: crypto.randomUUID()
				}
			]);
		}, 1500);
	}, [username]);

	const sendAIMessage = (message: string) => {
		const messages: Message[] = [
			{
				fromSelf: true,
				message: isImage(message)
					? message.replace(/\/imagine /g, '')
					: message,
				toAI: {
					type: isImage(message) ? 'image' : 'text'
				},
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

		mutate(message);
	};

	return {
		AIMessages,
		sendAIMessage,
		setShouldType,
		shouldType,
		loadingAI,
		setLoadingAI
	};
};
