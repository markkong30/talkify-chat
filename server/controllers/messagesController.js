import Message from '../model/messageModel.js';

export const saveMessage = async (req, res, next) => {
	try {
		const { from, to, message } = req.body;
		const data = await Message.create({
			message: {
				text: message
			},
			users: [from, to],
			sender: from
		});

		if (!data)
			return res.status(400).json({ error: 'Failed to save the message' });

		return res.status(201).json({ message: 'Message saved successfully' });
	} catch (err) {
		next(err);
	}
};

export const sendMessage = async (req, res, next) => {};

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
			fromSelf: msg.sender.toString() === from,
			message: msg.message.text
		}));

		return res.status(200).json(messages);
	} catch (err) {
		next(err);
	}
};
