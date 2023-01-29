import styled from 'styled-components';

type Props = {
	type?: 'image' | 'text';
};

const MessageTag: React.FC<Props> = ({ type }) => {
	const isImage = type === 'image';
	return <Tag isImage={isImage}>{isImage ? 'Image' : 'Text'}</Tag>;
};

type StyledProps = {
	isImage: boolean;
};
const Tag = styled.span<StyledProps>`
	color: white;
	background-color: ${({ isImage }) => (isImage ? '#2E8B56' : '#e6b115')};
	padding: 0.5rem;
	border-radius: 0.3rem;
	margin-right: 0.5rem;
`;

export default MessageTag;
