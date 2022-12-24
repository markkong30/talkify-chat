import express from 'express';
import {
	getAllMessages,
	sendMessage,
	getAIResponse
} from '../controllers/messagesController.js';
const router = express.Router();

router.post('/', getAllMessages);
router.post('/send', sendMessage);
router.post('/getai', getAIResponse);

export default router;
