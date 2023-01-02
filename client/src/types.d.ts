import { Socket } from 'socket.io-client';

export type User = {
	_id: string;
	email: string;
	username: string;
	hasAvatar: boolean;
	avatar: string;
	online: boolean;
	lastSeen: Date;
};

type UserContext = {
	socket: Socket;
	user: User | undefined;
	setUser: (user: User | undefined) => void;
	isFetchingUser: boolean;
	isUserAbsent: boolean;
	isAvatarAbsent: boolean;
};

export type UserContextValue = UserContext | undefined;

export type Message = {
	_id: string;
	message: string;
	image?: string;
	fromSelf: boolean;
};

export type MessageModel = {
	_id: string;
	message: IMessage;
	from: string;
	to: string;
};

type IMessage = {
	text: string;
	image?: string;
	status: {
		sent: boolean;
		received: boolean;
		read: boolean;
	};
};
