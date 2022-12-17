const base = process.env.REACT_APP_API_BASE;

const combineURL = (url: string) => base + url;

export const signUpAPI = combineURL('/auth/signup');
export const signInAPI = combineURL('/auth/signin');
export const getUserInfo = combineURL('/auth');
