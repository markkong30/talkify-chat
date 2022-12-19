import React from 'react';
import styled from 'styled-components';
import { Message } from '../types';

type Props = {
	messages: Message[];
};

const Messages: React.FC<Props> = ({ messages }) => {
	return (
		<Container>
			{messages?.map((message) => (
				<MessageContainer key={message._id} fromSelf={message.fromSelf}>
					<div className="content">
						<p>{message.message}</p>
					</div>
				</MessageContainer>
			))}
		</Container>
	);
};

const Container = styled.div`
	flex-grow: 1;
	flex-basis: 100%;
	padding: 1rem 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow: auto;
`;

const MessageContainer = styled.div<StyledProp>`
	display: flex;
	align-items: center;
	justify-content: ${({ fromSelf }) => (fromSelf ? 'flex-end' : 'flex-start')};

	.content {
		max-width: 40%;
		overflow-wrap: break-word;
		padding: 1rem;
		font-size: 1.1rem;
		border-radius: 1rem;
		color: #d1d1d1;
		background-color: ${({ fromSelf }) =>
			fromSelf ? '#4f04ff21' : '#9900ff20'};
	}
`;

type StyledProp = {
	fromSelf: boolean;
};

export default Messages;
