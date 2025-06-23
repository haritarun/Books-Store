import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { FaPaperPlane, FaSmile } from "react-icons/fa"; 
import Picker from 'emoji-picker-react'; 
import Header from '../HomePage/Header'
import AOS from "aos";
import "aos/dist/aos.css";
const DOMAIN = import.meta.env.VITE_SOCKET_DOMAIN
const socket = socketIOClient(DOMAIN);

const UserChatPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatContainerRef = useRef(null); 

  useEffect(() => {
    AOS.init({
                duration:1500,
                once:true
            })

    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          showErrorPopup("No user email found. Please log in.");
          return;
        }

        const response = await axios.get(`${DOMAIN}/details?email=${email}`);
        if (response.status === 200) {
          const user = response.data;
          setDetails(user);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setEmail(user.email);
          setPhoneNumber(user.phoneNumber || '');
          setAddress(user.address || '');
          setImageUrl(user.imageUrl || '');
          localStorage.setItem('firstName', user.firstName);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        showErrorPopup('Failed to load UserChatPage details.');
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (firstName) {
      socket.emit("userLogin", firstName);

      socket.on("chatHistory", (messages) => {
        setChats(messages);
      });
      
      socket.on("message", (msg) => {
        console.log("New message received:", msg);
        setChats((prev) => [...prev, msg]);
      });
    }

    return () => {
      socket.off("chatHistory");
      socket.off("message");
    };
  }, [firstName]);

  const sendMessage = () => {
    if (!message) return;

    const chatData = {
      username: firstName,
      message,
      avatar: "https://example.com/user-avatar.jpg", 
      to: "Admin",
      timestamp: new Date(),
    };

    console.log("Sending message:", chatData);
    socket.emit("newMessage", chatData);
    setMessage("");

    
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
    setShowEmojiPicker(false); 
  };

  const showErrorPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const renderImage = () => {
    if (imageUrl) {
      return <img className="object-cover w-24 h-24 p-1 rounded-full ring-2 ring-green-300" src={imageUrl} alt="UserChatPage Avatar" />;
    } else {
      return (
        <div className="flex items-center justify-center w-24 h-24 p-1 rounded-full ring-2 ring-green-300 bg-gray-400 text-white text-3xl font-bold">
          {firstName.charAt(0).toUpperCase()}
        </div>
      );
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen bg-blue-100" >
      
      

      <div className={`flex-1 flex flex-col ${isSidebarOpen ? "overflow-hidden" : ""}`}>
        
        <div className="flex flex-col w-full h-full max-w-full mx-auto bg-blue-50 rounded-lg shadow-lg" style={{ marginBottom: 0, paddingBottom: 0 }}>
            <div
      ref={chatContainerRef}
      className="p-4 overflow-y-auto flex-1 space-y-3"
      style={{
        maxHeight: "calc(100vh - 140px)",
        overflowY: "auto",
        wordWrap: "break-word",
        wordBreak: "break-word",
      }}
    >
      {chats.map((chat, index) => (
        <div
          key={index}
          className={`flex items-start gap-2 ${
            chat.username === firstName ? "justify-end" : "justify-start"
          }`}
        >
          
          {chat.avatar && (
            <img
              src={chat.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border"
            />
          )}

          <div
            className={`p-2 rounded-lg max-w-xl ${
              chat.username === firstName ? "bg-blue-200" : "bg-white"
            }`}
            style={{ wordWrap: "break-word", wordBreak: "break-word" }}
          >
            
            {chat.message.includes("http") && (chat.message.endsWith(".jpg") || chat.message.endsWith(".png") || chat.message.endsWith(".jpeg")) ? (
              <img
                src={chat.message}
                alt="Sent Image"
                className="max-w-[250px] max-h-[300px] rounded-lg object-cover"
              />
            ) : (
              <span className="text-sm pr-4">{chat.message}</span>
            )}
            <span className="text-[50%] text-gray-400">
              {new Date(chat.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ))}
            </div>


         
          <div className="flex p-3  border-green-200 space-x-2 bg-white ">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ marginBottom: "0" }} 
            />
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <FaSmile size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <FaPaperPlane size={20} />
            </button>
          </div>

          {showEmojiPicker && (
            <div className="absolute bottom-20 left-0 z-50">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default UserChatPage;