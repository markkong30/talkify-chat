import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/userModel.js';

const createToken = (userInfo) =>
	jwt.sign({ id: userInfo.id }, process.env.SECRET);

const verifyPassword = (attemptedPw, hashedPw) =>
	bcrypt.compareSync(attemptedPw, hashedPw);

const hashPassword = (password) => bcrypt.hash(password, 10);

const verifyToken = (token) => jwt.verify(token, process.env.SECRET);

const getCurrentUser = async (token) => {
	const existingUser = verifyToken(token);

	if (!existingUser) return;

	const user = await User.findOne({ id: existingUser.id });

	return {
		id: user.id,
		username: user.username,
		email: user.email,
		hasAvatar: user.hasAvatar,
		avatar: user.avatar
	};
};

export {
	createToken,
	verifyPassword,
	hashPassword,
	verifyToken,
	getCurrentUser
};
