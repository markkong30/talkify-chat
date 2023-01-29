import styled from 'styled-components';
import { Message } from '../../types';
import { convertAIToBase64 } from '../../utils/helpers';

type Props = {
	message: Message;
	isAIGenerated?: boolean;
};

const MessageContent: React.FC<Props> = ({
	message,
	isAIGenerated = false
}) => {
	const imageSrc = isAIGenerated
		? convertAIToBase64(message.image || '')
		: message.image;

	return (
		<Content fromSelf={message.fromSelf}>
			{message.image && <img src={imageSrc} alt={message.message} />}
			{<p>{message.message}</p>}
		</Content>
	);
};

type StyledProps = {
	fromSelf: boolean;
};

const Content = styled.div<StyledProps>`
	max-width: 80%;
	overflow-wrap: break-word;
	white-space: pre-wrap;
	padding: 1rem;
	font-size: 1.1rem;
	line-height: 1.3rem;
	border-radius: 1rem;
	color: #d1d1d1;
	background-color: ${({ fromSelf }) => (fromSelf ? '#4f04ff21' : '#9900ff20')};

	img {
		max-width: 100%;
		object-fit: stretch;
		object-position: center;
		display: block;
		padding-bottom: 1rem;
	}
`;

export default MessageContent;
