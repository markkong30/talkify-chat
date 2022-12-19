export type User = {
	_id: string;
	email: string;
	username: string;
	hasAvatar: boolean;
	avatar: string;
};

type UserContext = {
	user: User | undefined;
	setUser: (user: User | undefined) => void;
	isFetchingUser: boolean;
	isUserAbsent: boolean;
	isAvatarAbsent: boolean;
};

export type UserContextValue = UserContext | undefined;

export type Message = {
	message: string;
	from: string;
	to: string;
};
