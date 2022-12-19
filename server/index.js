import express from 'express';
import cors from 'cors';
import mongoose, { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messagesRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: ['http://localhost:3000'],
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
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.log(err);
	});
