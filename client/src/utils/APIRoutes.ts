const base = process.env.REACT_APP_API_BASE;

const combineURL = (url: string) => base + url;
const getRandomNumber = () => Math.round(Math.random() * 1000000);

// user auth
export const signUpAPI = combineURL('/auth/signup');
export const signInAPI = combineURL('/auth/signin');
export const getUserInfo = combineURL('/auth');
export const setAvatarAPI = (userId: string) =>
	combineURL(`/auth/setAvatar/${userId}`);
export const getAvatarAPI = () =>
	`https://api.multiavatar.com/${getRandomNumber()}?apikey=${
		process.env.REACT_APP_MULTIAVATAR_KEY
	}`;

// chat
export const allUsersAPI = combineURL('/auth/allUsers');
