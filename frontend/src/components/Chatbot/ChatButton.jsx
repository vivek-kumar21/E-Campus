import React, { useState } from "react";
import { HiChatAlt } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import ChatBot from "../../pages/ChatBot";

const ChatButton = () => {
  const [showChat, setShowChat] = useState(false);
  //   console.log(showChat);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <>
      <div className="fixed md:bottom-6 md:right-6 bottom-16 right-11 z-50">
        <button
          className="bg-teal-500 text-white rounded-full p-4 shadow-md hover:bg-teal-600 focus:outline-none"
          onClick={toggleChat}
        >
          {showChat ? (
            <IoClose className="text-2xl" />
          ) : (
            <HiChatAlt className="text-2xl" />
          )}
        </button>
      </div>

      {showChat && <ChatBot />}
    </>
  );
};

export default ChatButton;
