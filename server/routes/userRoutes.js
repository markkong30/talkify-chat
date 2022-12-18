import express from 'express';
import {
	getAllUsers,
	setAvatar,
	signIn,
	signOut,
	signUp
} from '../controllers/userController.js';
import { getUserInfo } from '../middlewares/authMiddleware.js';

const router = express.Router();

// user auth
router.post('/', getUserInfo);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.post('/setAvatar/:id', setAvatar);

// chat
router.get('/allUsers', getAllUsers);

export default router;
