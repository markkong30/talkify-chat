import User from '../model/userModel.js';
import { getCurrentUser, verifyToken } from '../utils/auth.js';

export const getUserInfo = async (req, res, next) => {
	const token = req.cookies[process.env.TOKEN];

	if (token) {
		const user = await getCurrentUser(token);

		if (user) {
			return res.status(200).json({ user });
		} else {
			return res.status(404).json({ message: 'User is not exist' });
		}
	} else {
		res.status(404).json({ message: 'Token is not exist' });
	}

	await next();
};
