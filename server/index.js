import express from 'express';
import cors from 'cors';
import mongoose, { connect } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose,
	connect(process.env.MONGO_URL, {
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
