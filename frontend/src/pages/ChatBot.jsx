import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import TypingAnimation from "../components/TypingAnimation";
import Markdown from "react-markdown";

const ChatBot = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDHLDcQdZhrhfW3Lqy_uadWUqRokmCJWrY"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = async () => {
    try {
      setIsLoading(true);

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `suppose you are a E-Campus's chatbot integrated into a website and your name is levi, this is a website which provide resources for engineering students, the students who are confused to choose their career path and need roadmaps to follow, our website also provide internships information and has a blog section which will provide information regarding interview experience and information related to new technologies. if someone ask any question after this message then give response accordingly. my website name is E-Campus and give them response as a E-Campus's chatbot.if someone asked you, who are you then reply them, you are a E-Campus's AI assistent. if someone asked for following pages, then give them resspective links internhsip:  https://www.youtube.com/watchv=WsYABsWMFqc&t=1320s blog: http://localhost:3000`,
              },
            ],
          },
          {
            role: "model",
            parts: [{ text: inputValue }],
          },
        ],

        generationConfig: {
          maxOutputTokens: 100,
        },
      });

      const res = await chat.sendMessage(inputValue);
      const botResponse = res.response.candidates[0].content.parts[0].text;

      // Update chat log with bot's response
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "bot", message: botResponse },
      ]);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
      console.error(err);
    }
  };

  const message = "";
  useEffect(() => {}, []);

  return (
    <div className="fixed bottom-20 right-20 z-50">
      <div className="container mx-auto max-w-md">
        <div className="bg-gray-800 rounded-l-lg rounded-tr-lg overflow-hidden shadow-lg">
          <div className="px-4 py-2 bg-gray-900 flex items-center justify-between">
            <h1 className="text-white font-semibold">ChatBot</h1>
          </div>
          <div className="p-4 w-96 h-96 overflow-y-auto">
            {chatLog.map((data, i) => (
              <div
                key={i}
                className={`flex ${
                  data.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    data.type === "user"
                      ? "bg-teal-600 rounded-l-lg rounded-br-lg"
                      : "bg-gray-700 rounded-r-lg rounded-bl-lg"
                  } p-2 text-white mb-4 max-w-xs`}
                >
                  <Markdown>{data.message}</Markdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-700 rounded-lg p-2 text-white max-w-xs">
                  <TypingAnimation />
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-2 bg-gray-900">
            <div className="flex rounded-lg border border-gray-700 bg-gray-800">
              <input
                className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="bg-teal-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-teal-600 transition-colors duration-300"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
