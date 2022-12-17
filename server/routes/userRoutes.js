import express from 'express';
import { setAvatar, signIn, signUp } from '../controllers/userController.js';
import { getUserInfo } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', getUserInfo);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/setAvatar/:id', setAvatar);

export default router;
