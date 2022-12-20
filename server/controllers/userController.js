import User from '../model/userModel.js';
import brcypt from 'bcrypt';
import {
	createToken,
	verifyPassword,
	hashPassword,
	verifyToken,
	getCurrentUser
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

		const user = await User.create({
			email,
			username,
			password: hashedPassword
		});

		const token = createToken(user);

		res.cookie(process.env.TOKEN, token, {
			httpOnly: true,
			sameSite: 'none',
			secure: true
		});

		return res.status(201).json({
			user: {
				_id: user._id,
				username,
				email
			}
		});
	} catch (err) {
		next(err);
	}
};

export const signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ error: 'Invalid email or password' });

		const isPasswordValid = verifyPassword(password, user.password);
		if (!isPasswordValid)
			return res.status(400).json({ error: 'Invalid email or password' });

		const token = createToken(user);

		console.log(token);
		res.cookie(process.env.TOKEN, token, {
			httpOnly: true,
			sameSite: 'none',
			secure: true
		});

		return res.status(200).json({
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
				hasAvatar: user.hasAvatar,
				avatar: user.avatar
			}
		});
	} catch (err) {
		next(err);
	}
};

export const signOut = (req, res, next) => {
	res.clearCookie(process.env.TOKEN);

	return res.status(200).json({ message: 'User sign out successfully' });
};

export const setAvatar = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { image } = req.body;

		const user = await User.findByIdAndUpdate(
			id,
			{
				hasAvatar: true,
				avatar: image
			},
			{
				new: true
			}
		);

		if (!user) return res.status(400).json({ error: 'Something went wrong' });

		return res.status(200).json({
			user
		});
	} catch (err) {
		next(err);
	}
};

export const getAllUsers = async (req, res, next) => {
	const token = req.cookies[process.env.TOKEN];
	console.log(token);
	try {
		const currentUser = await getCurrentUser(token);
		if (!currentUser) return res.status(403).json({ message: 'Please log in' });

		const users = await User.find({ _id: { $ne: currentUser._id } }).select([
			'_id',
			'username',
			'email',
			'avatar'
		]);

		return res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};
