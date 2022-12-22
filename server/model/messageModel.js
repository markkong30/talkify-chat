import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
	{
		message: {
			text: { type: String, required: true },
			status: {
				sent: { type: Boolean, default: false },
				received: { type: Boolean, default: false },
				read: { type: Boolean, default: false }
			}
		},
		users: Array,
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model('Messages', messageSchema);
