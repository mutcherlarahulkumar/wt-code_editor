import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { code,terminaltext } from '../../recoil/atoms.js';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const EditorCode = useRecoilValue(code);
  const TerminalResponse = useRecoilValue(terminaltext);

  const toggleChat = () => setIsOpen(!isOpen);

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option) // Deselect option
        : [...prev, option] // Select option
    );
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const optionsText =
      selectedOptions.length > 0 ? `[Options: ${selectedOptions.join(", ")}]` : "";
    const userMessage = `${optionsText} ${input}`.trim();

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");

    // Show bot typing animation
    setIsBotTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/chat", { message: userMessage });

      // Add bot response after delay to simulate processing
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: formatBotResponse(response.data.reply) },
        ]);
        setIsBotTyping(false);
      }, 1000);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: formatBotResponse("Oops! Something went wrong.") },
      ]);
      setIsBotTyping(false);
    }
  };

  const formatBotResponse = (response) => {
    // Format the bot response with necessary styling or structure
    return response
      .split("\n")
      .map((line, index) => (
        <p key={index} className="mb-2">
          {line}
        </p>
      ));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <div
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer"
          onClick={toggleChat}
        >
          💬
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-96 h-[550px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold p-4 flex justify-between items-center">
            <span>Chat with Us</span>
            <button className="text-white text-xl" onClick={toggleChat}>
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] text-sm shadow-md ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.sender === "bot" && Array.isArray(msg.text) ? msg.text : msg.text}
                </div>
              </div>
            ))}

            {/* Bot Typing Animation */}
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg text-sm shadow-md max-w-[70%] flex items-center space-x-2">
                  <div className="animate-pulse w-2 h-2 bg-gray-500 rounded-full"></div>
                  <div className="animate-pulse w-2 h-2 bg-gray-500 rounded-full"></div>
                  <div className="animate-pulse w-2 h-2 bg-gray-500 rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Field */}
          <div className="flex items-center border-t p-3 bg-gray-100">
            <input
              type="text"
              className="flex-1 border-none rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="ml-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition-all"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>

          {/* Options */}
          <div className="flex justify-between p-3 bg-gray-100 border-t">
            {[`Editor : ${EditorCode}`, `Terminal : ${TerminalResponse}`].map((option) => (
              <button
                key={option}
                className={`flex items-center space-x-2 px-3 py-1 text-xs font-medium rounded-lg shadow ${
                  selectedOptions.includes(option)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-green-500 hover:text-white transition-all`}
                onClick={() => toggleOption(option)}
              >
                {selectedOptions.includes(option) && <span>✔️</span>}
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
