import moment from 'moment';

export const convertStringToBase64 = (source: string) =>
	`data:image/svg+xml;base64,${source}`;

export const convertAIToBase64 = (source: string) =>
	`data:image/png;base64,${source}`;

export const getRelativeTime = (date: string | Date) => {
	const convertedDate = moment(date);
	const relativeTime = convertedDate.fromNow();

	return relativeTime;
};
