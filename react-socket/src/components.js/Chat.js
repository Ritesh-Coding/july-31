import React, { useEffect, useState } from 'react';

const Chat = ({ username, roomName }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
    setSocket(socket);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    return () => socket.close();
  }, [roomName]);

  const sendMessage = () => {
    if (socket) {
      socket.send(JSON.stringify({
        message,
        sender: username,
        recipient: 'hr', 
      }));
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat Room: {roomName}</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}</strong>: {msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;