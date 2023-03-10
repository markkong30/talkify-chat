import { AnimatePresence } from 'framer-motion';
import React, { useCallback, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Message } from '../../types';
import DownArrow from './utils/DownArrow';
import MessageContent from './MessageContent';

type Props = {
	messages: Message[];
};

const Messages: React.FC<Props> = ({ messages }) => {
	const lastMessageIndex = messages.length - 1;
	const ref = useRef<HTMLDivElement>(null);
	const [lastMessageRef, inView, entry] = useInView({
		threshold: 0
	});

	const scrollLastMessageIntoView = useCallback(
		(isClick?: boolean) => {
			const lastMessage = entry?.target;

			if (lastMessage) {
				if (ref.current && !isClick) {
					ref.current.scrollTop = ref?.current?.scrollHeight;
				} else {
					lastMessage.scrollIntoView({
						block: 'end',
						inline: 'nearest',
						behavior: isClick ? 'smooth' : 'auto'
					});
				}
			}
		},
		[entry?.target]
	);

	useEffect(() => {
		scrollLastMessageIntoView();
	}, [entry?.target, scrollLastMessageIntoView]);

	return (
		<Container ref={ref} shouldScrollSmooth={true}>
			{messages?.map((message, i) => (
				<MessageContainer
					key={message._id}
					fromSelf={message.fromSelf}
					ref={i === lastMessageIndex ? lastMessageRef : null}
				>
					<MessageContent message={message}></MessageContent>
				</MessageContainer>
			))}
			<AnimatePresence>
				{!inView && !!messages.length && (
					<DownArrow handleClick={scrollLastMessageIntoView} />
				)}
			</AnimatePresence>
		</Container>
	);
};

type StyledProp = {
	shouldScrollSmooth: boolean;
};

const Container = styled.div<StyledProp>`
	flex-grow: 1;
	flex-basis: 100%;
	padding: 1rem 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow: auto;

	::-webkit-scrollbar {
		width: 0.3rem;

		&-thumb {
			background-color: ${({ theme }) => theme.background.darkWhite};

			width: 0.2rem;
			border-radius: 1rem;

			&:hover {
				background-color: ${({ theme }) => theme.background.pureWhite};
			}
		}
	}
`;

const MessageContainer = styled.div<StyledPropMessage>`
	display: flex;
	align-items: center;
	justify-content: ${({ fromSelf }) => (fromSelf ? 'flex-end' : 'flex-start')};
`;

type StyledPropMessage = {
	fromSelf: boolean;
};

export default Messages;
