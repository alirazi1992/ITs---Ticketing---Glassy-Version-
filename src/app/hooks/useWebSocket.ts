// src/app/hooks/useWebSocket.ts
import { useEffect, useState } from 'react';

export default function useWebSocket<T>(onMessage: (data: T) => void) {
  const [lastMessage, setLastMessage] = useState<T | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');

    socket.onmessage = (event) => {
      const data: T = JSON.parse(event.data);
      setLastMessage(data);
      onMessage(data);
    };

    return () => socket.close();
  }, [onMessage]);

  const sendMessage = (data: T) => {
    const socket = new WebSocket('ws://localhost:3001');
    socket.onopen = () => socket.send(JSON.stringify(data));
  };

  return { sendMessage, lastMessage };
}
