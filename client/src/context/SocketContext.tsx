import { createContext, ReactNode } from 'react';
import { io } from 'socket.io-client';
import { SocketContextValue } from '../types';

export const SocketContext = createContext<SocketContextValue>(undefined);

type Props = { children: ReactNode };

export const SocketInit: React.FC<Props> = ({ children }) => {
	const socket = io(process.env.REACT_APP_SOCKET || '');

	return (
		<SocketContext.Provider
			value={{
				socket
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};
