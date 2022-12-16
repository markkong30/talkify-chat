import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createToken = (userInfo) =>
	jwt.sign({ id: userInfo.id }, process.env.SECRET);

const verifyPassword = (attemptedPw, hashedPw) =>
	bcrypt.compareSync(attemptedPw, hashedPw);

const hashPassword = (password) => bcrypt.hash(password, 10);

const verifyToken = (token) => jwt.verify(token, process.env.SECRET);

export { createToken, verifyPassword, hashPassword, verifyToken };
