import React from 'react';
import Chat from './Chat'; // Adjust the path if necessary

const MyApp = () => {
  const username = 'user1'; 
  const roomName = 'general'; 

  return (
    <div>
      <h1>Welcome to the Chat</h1>
      <Chat username={username} roomName={roomName} />
    </div>
  );
};

export default MyApp;