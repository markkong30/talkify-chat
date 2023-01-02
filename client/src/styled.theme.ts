export const globalThemes: GlobalThemes = {
	background: {
		primary: '#4e0eff',
		light: '#997af0',
		lightPurple: '#bfaaff',
		dark: '#00000076',
		semiDark: '#131324',
		lightGray: '#ffffff39',
		intenseDark: '#080420',
		darkWhite: '#c5c5c5',
		pureWhite: '#ffffff'
	},
	text: {
		primary: '#ffffff',
		secondary: '#4e0eff',
		error: '#b44747',
		dark: '#060710'
	},
	border: {
		primary: '#4e0eff',
		light: '#997af0',
		gray: '#808080'
	}
};

export type GlobalThemes = {
	background: {
		primary: string;
		light: string;
		lightPurple: string;
		dark: string;
		semiDark: string;
		lightGray: string;
		intenseDark: string;
		darkWhite: string;
		pureWhite: string;
	};
	text: {
		primary: string;
		secondary: string;
		error: string;
		dark: string;
	};
	border: {
		primary: string;
		light: string;
		gray: string;
	};
};
