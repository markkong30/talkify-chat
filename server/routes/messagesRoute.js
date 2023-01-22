import express from 'express';
import {
	getAllMessages,
	sendMessage,
	getAIResponse,
	getAIImage
} from '../controllers/messagesController.js';
const router = express.Router();

router.post('/', getAllMessages);
router.post('/send', sendMessage);
router.post('/getai/message', getAIResponse);
router.post('/getai/image', getAIImage);

export default router;
