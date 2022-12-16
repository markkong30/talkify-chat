import User from '../model/userModel.js';
import brcypt from 'bcrypt';
import crypto from 'crypto';
import {
	createToken,
	verifyPassword,
	hashPassword,
	verifyToken
} from '../utils/auth.js';

export const signUp = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		const isUserExist = await User.findOne({ username });
		if (isUserExist)
			return res.status(400).json({ error: 'Username already exists' });

		const isEmailExist = await User.findOne({ email });
		if (isEmailExist)
			return res.status(400).json({ error: 'Email already exists' });

		const hashedPassword = await hashPassword(password);
		const id = await crypto.randomUUID();

		const user = await User.create({
			id,
			email,
			username,
			password: hashedPassword
		});

		const token = createToken(user);

		res.cookie(process.env.TOKEN, token, {
			httpOnly: true
		});
		return res.status(201).json({
			user: {
				id,
				username,
				email
			}
		});
	} catch (err) {
		next(err);
	}
};
