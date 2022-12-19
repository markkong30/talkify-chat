import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose, { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messagesRoute.js';
import http from 'http';
dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: ['http://localhost:3000', 'https://talkify.up.railway.app'],
		credentials: true
	})
);
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('DB Connected');
	})
	.catch((err) => {
		console.log(err);
	});

const server = httpServer.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`)
);

const io = new Server(server, {
	cors: {
		origin: ['http://localhost:3000', 'https://talkify.up.railway.app'],
		credentials: true
	}
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
	global.chatSocket = socket;
	socket.on('add-user', (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on('send-msg', (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit('msg-receive', data);
		}
	});
});
