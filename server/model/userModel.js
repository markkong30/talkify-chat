import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		min: 3,
		max: 10,
		unique: true
	},
	email: {
		type: String,
		require: true,
		min: 3,
		max: 50,
		unique: true
	},
	password: {
		type: String,
		require: true,
		min: 6
	},
	hasAvatar: {
		type: Boolean,
		default: false
	},
	avatar: {
		type: String,
		default: ''
	},
	lastSeen: {
		type: Date,
		default: new Date()
	},
	online: {
		type: Boolean,
		default: false
	}
});

export default mongoose.model('Users', userSchema);
