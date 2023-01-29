import { useEffect, useState } from 'react';

export const usePrevious = (state: number | null) => {
	const [initial, setInitial] = useState<number | null>(null); // intitial position of the new message
	const [prev, setPrev] = useState<number | null>(null); // initial / updated position

	useEffect(() => {
		if (!initial) {
			setInitial(state);
		}

		if (!prev || !initial || (state && state > initial)) {
			// only update the prevState if scroll back to the "typing" message
			// e.g. the new position can be the "third" line of the message
			setPrev(state);
		}
	}, [state]);

	return { prev, setPrev };
};
