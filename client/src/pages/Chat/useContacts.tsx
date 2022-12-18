import { useEffect } from 'react';
import { UserContextValue } from '../../types';

export const useContacts = (isUser: boolean) => {
	useEffect(() => {
		if (isUser) {
		}
	}, [isUser]);

	return;
};
