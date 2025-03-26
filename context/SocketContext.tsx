import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketMap = {
  [namespace: string]: Socket;
};

const SocketContext = createContext<SocketMap | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sockets, setSockets] = useState<SocketMap>({});

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  useEffect(() => {
    // initialize for chat namespace
    const chatSocket = io(`${apiUrl}/chat`, {
      transports: ['websocket'],
      withCredentials: true,
    });

    setSockets({
      '/chat': chatSocket,
    });

    return () => {
      // close all socket when unmount
      Object.values(sockets).forEach((socket) => socket.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={sockets}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (namespace: string): Socket | null => {
  const sockets = useContext(SocketContext);
  if (!sockets) return null;
  return sockets[namespace] || null;
};
