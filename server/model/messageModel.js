import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
	{
		message: {
			text: {
				type: String,
				required: function () {
					return !this.message.image;
				}
			},
			image: {
				type: String,
				required: function () {
					return !this.message.text;
				}
			},
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
