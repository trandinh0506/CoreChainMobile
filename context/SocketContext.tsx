import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUser } from './UserContext';

type SocketMap = {
  [namespace: string]: Socket;
};

const SocketContext = createContext<SocketMap | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sockets, setSockets] = useState<SocketMap>({});
  const { user } = useUser();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    // If there is no user, disconnect any open sockets and do nothing.
    if (!user) {
      // Disconnect all active sockets if user logs out
      Object.values(sockets).forEach((socket) => socket.disconnect());
      setSockets({});
      return;
    }

    // Extract the token from the user object.
    const token = user.accessToken;

    // Create a socket for the chat namespace using the token for auth.
    const chatSocket = io(`${apiUrl}/chat`, {
      transports: ['websocket'],
      withCredentials: true,
      // Using the auth option to send the token during the handshake.
      auth: {
        token,
      },
      // Alternatively, you could use headers:
      // transportOptions: {
      //   polling: {
      //     extraHeaders: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // },
    });

    // Set the socket into our state.
    setSockets({
      '/chat': chatSocket,
    });

    // Cleanup function: disconnect the socket on unmount or when user changes.
    return () => {
      chatSocket.disconnect();
    };
  }, [user, apiUrl]);

  return (
    <SocketContext.Provider value={sockets}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (namespace: string): Socket | null => {
  const sockets = useContext(SocketContext);
  if (!sockets) return null;
  return sockets[namespace] || null;
};
