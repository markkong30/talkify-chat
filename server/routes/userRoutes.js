import express from 'express';
import {
	getAllUsers,
	setAvatar,
	updateOnlineStatus,
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
router.put('/status', updateOnlineStatus);

// chat
router.get('/allUsers', getAllUsers);

export default router;
