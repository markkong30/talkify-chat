import React, { useEffect } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import { useInView } from 'react-intersection-observer';

type Props = {
	message: string;
	setShouldType: (boolean: boolean) => void;
	setPreviousTop: (prev: null) => void;
	isScrolling: boolean;
	setLoadingAI: (boolean: boolean) => void;
};

const TypeWritter: React.FC<Props> = ({
	message,
	setShouldType,
	setPreviousTop,
	isScrolling,
	setLoadingAI
}) => {
	const [ref, inView, entry] = useInView({
		threshold: 1
	});

	useEffect(() => {
		const timeOut = setTimeout(() => {
			if (!inView && !isScrolling) {
				entry?.target.scrollIntoView();
			}
		}, 200);

		return () => clearTimeout(timeOut);
	}, [inView, entry?.target, isScrolling]);

	const [text] = useTypewriter(
		message === '...'
			? loadingOptions
			: {
					words: [message],
					typeSpeed: 30,
					onLoopDone: () => {
						setShouldType(false);
						setLoadingAI(false);

						// reset the top position
						setPreviousTop(null);
					}
			  }
	);

	return <span ref={ref}>{text}</span>;
};

export default TypeWritter;

const loadingOptions = {
	words: ['......'],
	loop: 0,
	typeSpeed: 1000,
	deleteSpeed: 1000,
	delaySpeed: 0
};
