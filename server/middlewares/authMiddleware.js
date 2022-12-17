import User from '../model/userModel.js';
import { verifyToken } from '../utils/auth.js';

export const getUserInfo = async (req, res, next) => {
	const token = req.cookies[process.env.TOKEN];

	if (token) {
		const existingUser = verifyToken(token);

		if (existingUser) {
			const user = await User.findOne({ id: existingUser.id });

			if (user) {
				res.status(200).json({
					user: {
						id: user.id,
						email: user.email,
						username: user.username,
						hasAvatar: user.hasAvatar,
						avatar: user.avatar
					}
				});
			} else {
				res.status(404).json({ message: 'User is not exist' });
			}
		}
	} else {
		res.status(404).json({ message: 'Token is not exist' });
	}

	next();
};
