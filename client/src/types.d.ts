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

export type UserContext = {
	user: User | undefined | null;
	setUser: (user: User | undefined) => void;
	isFetchingUser: boolean;
};

type SocketContext = {
	socket: Socket;
};

export type UserContextValue = UserContext | undefined;
export type SocketContextValue = SocketContext | undefined;

export type Message = {
	_id: string;
	message: string;
	image?: string;
	fromSelf: boolean;
	toAI?: {
		type: 'image' | 'text';
	};
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
