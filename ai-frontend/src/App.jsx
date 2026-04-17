import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load chats from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chats")) || [];
    setChats(saved);
  }, []);

  // Save chats to localStorage
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
    setMessages([]);
  };

  const selectChat = (chat) => {
    setActiveChat(chat.id);
    setMessages(chat.messages);
  };

  const updateChat = (newMessages) => {
    const updatedChats = chats.map((chat) =>
      chat.id === activeChat
        ? {
            ...chat,
            messages: newMessages,
            title: newMessages[0]?.text.slice(0, 20) || "Chat",
          }
        : chat
    );
    setChats(updatedChats);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    updateChat(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/ask", {
        message: input,
      });

      const aiMsg = { role: "ai", text: res.data.reply };
      const finalMessages = [...newMessages, aiMsg];

      setMessages(finalMessages);
      updateChat(finalMessages);
    } catch {
      const errMsg = { role: "ai", text: "⚠️ Error occurred" };
      setMessages([...newMessages, errMsg]);
    }

    setLoading(false);
  };

  return (
    <div className="main">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="new-chat" onClick={createNewChat}>
          + New Chat
        </button>

        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${
                activeChat === chat.id ? "active" : ""
              }`}
              onClick={() => selectChat(chat)}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        <h1>🤖 My AI</h1>

        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`}>
              {msg.text}
            </div>
          ))}

          {loading && <div className="msg ai">Typing...</div>}
        </div>

        <div className="input-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;