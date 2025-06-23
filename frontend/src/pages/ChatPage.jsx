import  { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';  
import UserChat from '../components/UserChat';  

import { getUsers, getChatHistory } from '../utils/api';  

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null); 
  const [users, setUsers] = useState([]); 
  const [chatHistory, setChatHistory] = useState([]); 

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();  
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (selectedUser) {
        try {
          const chatData = await getChatHistory(selectedUser.id);  
          setChatHistory(chatData);
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      }
    };

    fetchChatHistory();
  }, [selectedUser]);

  const handleSelectUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {!selectedUser ? (
        
        <ChatList users={users} onSelectUser={handleSelectUser} />
      ) : (
        
        <UserChat user={selectedUser} chatHistory={chatHistory} />
      )}
    </div>
  );
};

export default ChatPage;
