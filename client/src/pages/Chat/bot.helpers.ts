import { Buffer } from 'buffer';
import { robotSVG } from '../../assets/robot.fixture';

export const aiBotId = 'aiBotId';

const avatar = new Buffer(robotSVG).toString('base64');

export const aiBotInfo = {
	_id: aiBotId,
	username: 'Talkify Bot',
	email: 'talkify_bot@admin.com',
	online: true,
	lastSeen: new Date(),
	avatar,
	hasAvatar: true
};

export const aiLoadingMessage = '..............';

export const getWelcomeMessage = (username: string) =>
	`Hi ${username}, how can I help you today? \n* Try with /imagine to generate image!`;
