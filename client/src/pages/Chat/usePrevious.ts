import { useEffect, useState } from 'react';

export const usePrevious = (state: any) => {
	const [initial, setInitial] = useState(null); // intitial position of the new message
	const [prev, setPrev] = useState(null); // initial / updated position

	useEffect(() => {
		if (!initial) {
			setInitial(state);
		}

		if (!prev || !initial || state > initial) {
			// only update the prevState if scroll back to the "typing" message
			// e.g. the new position can be the "third" line of the message
			setPrev(state);
		}
	}, [state]);

	return { prev, setPrev };
};
