import express from 'express';
import {
	getAllMessages,
	sendMessage
} from '../controllers/messagesController.js';

const router = express.Router();

router.post('/', getAllMessages);
router.post('/send', sendMessage);

export default router;
