import express from 'express';
import {
	getAllMessages,
	saveMessage
} from '../controllers/messagesController.js';

const router = express.Router();

router.post('/', getAllMessages);
router.post('/save', saveMessage);

export default router;
