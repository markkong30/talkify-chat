import Message from '../model/messageModel.js';
import { Configuration, OpenAIApi } from 'openai';

export const sendMessage = async (req, res, next) => {
	try {
		const { from, to, message } = req.body;
		const data = await Message.create({
			message,
			users: [from, to],
			sender: from
		});

		if (!data)
			return res.status(400).json({ error: 'Failed to send the message' });

		return res.status(201).json(data);
	} catch (err) {
		next(err);
	}
};

export const getAIResponse = async (req, res, next) => {
	try {
		const configuration = new Configuration({
			apiKey: process.env.OPENAI_API_KEY
		});

		const openai = new OpenAIApi(configuration);

		const { prompt } = req.body;
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `${prompt}`,
			temperature: 0, // Higher values means the model will take more risks.
			max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
			top_p: 1, // alternative to sampling with temperature, called nucleus sampling
			frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
			presence_penalty: 0 // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
		});

		return res
			.status(200)
			.json({ response: response.data.choices[0].text, _id: response.data.id });
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getAllMessages = async (req, res, next) => {
	try {
		const { from, to } = req.body;
		const data = await Message.find({
			users: {
				$all: [from, to]
			}
		}).sort({ updatedAt: 1 });

		if (!data) return res.status(204).json({ message: 'No messages found' });

		const messages = data.map((msg) => ({
			_id: msg._id,
			fromSelf: msg.sender.toString() === from,
			message: msg.message.text,
			image: msg.message.image
		}));

		return res.status(200).json(messages);
	} catch (err) {
		next(err);
	}
};
