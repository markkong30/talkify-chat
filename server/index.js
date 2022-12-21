import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose, { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messagesRoute.js';
import http from 'http';
import User from './model/userModel.js';
dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'https://talkify.up.railway.app',
			'https://talkify-chat.netlify.app'
		],
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
		origin: [
			'http://localhost:3000',
			'https://talkify.up.railway.app',
			'https://talkify-chat.netlify.app'
		],
		credentials: true
	}
});

io.setMaxListeners(100);

global.onlineUsers = new Map();

io.on('connection', (socket) => {
	global.chatSocket = socket;

	socket.on('add-user', (userId) => {
		onlineUsers.set(userId, socket.id);

		User.findByIdAndUpdate(
			userId,
			{ online: true },
			{ new: true },
			(error, user) => {
				if (error) {
					console.error(error);
				} else {
					io.emit('user-status-update', {
						online: user.online,
						_id: user._id
					});
				}
			}
		);
	});

	socket.on('send-msg', (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit('msg-receive', data);
		}
	});

	socket.on('client-disconnect', (userId) => {
		User.findByIdAndUpdate(
			userId,
			{ online: false },
			{ new: true },
			(error, user) => {
				if (error) {
					console.error(error);
				} else {
					console.log(user.online);
					io.emit('user-status-update', { online: user.online, _id: user._id });
				}
			}
		);
	});

	socket.on('disconnect', () => {
		// When a client disconnects, update their online status to false and
		// broadcast the updated status to all connected clients
		console.log('here');
		io.emit('user-status-update', { message: 'someone quit' });
	});
});

// io.on('connection', socket => {
//   // When a client connects, update their online status to true and
//   // broadcast the updated status to all connected clients
//   User.findByIdAndUpdate(socket.id, { online: true }, (error, user) => {
//     if (error) {
//       console.error(error);
//     } else {
//       io.emit('user-status-update', { [socket.id]: true });
//     }
//   });

//   socket.on('disconnect', () => {
//     // When a client disconnects, update their online status to false and
//     // broadcast the updated status to all connected clients
//     User.findByIdAndUpdate(socket.id, { online: false }, (error, user) => {
//       if (error) {
//         console.error(error);
//       } else {
//         io.emit('user-status-update', { [socket.id]: false });
//       }
//     });
//   });

//   socket.on('ping', () => {
//     // When the client sends a ping message, respond with a pong message
//     socket.emit('pong');
//   });
// });
