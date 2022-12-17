import express from 'express';
import { signIn, signUp } from '../controllers/userController.js';
import { getUserInfo } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', getUserInfo);
router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;
