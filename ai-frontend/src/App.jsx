import { useState, useRef, useEffect } from "react";
import { sendMessage } from "./ask";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";


function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Auto Scroll to Bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send Message Function
  const handleSend = async () => {
    if (!input.trim()) return;

    // User Message
    const userMessage = {
      type: "user",
      text: input,
    };

    // Add User Message to Chat
    setMessages((prev) => [...prev, userMessage]);

    // Store Current Input
    const currentInput = input;

    // Clear Input Box Automatically
    setInput("");

    setLoading(true);

    try {
      // AI Response
      const result = await sendMessage(currentInput);

      const aiMessage = {
        type: "ai",
        text: result,
      };

      // Add AI Message
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  // Enter Key Send
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">

      {/* Heading */}
      {/* Heading */}
<div className="flex justify-between items-center w-full max-w-3xl mb-6">

  <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
    AI Chat App
  </h1>

  <div className="flex items-center gap-4">
    <span className="text-gray-300 font-medium">
      {auth.currentUser?.email}
    </span>

    <button
      onClick={() => signOut(auth)}
      className="px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 transition"
    >
      Logout
    </button>
  </div>

</div>

      {/* Chat Container */}
      <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">

        {/* Chat Box */}
        <div className="h-[450px] overflow-y-auto bg-zinc-950 rounded-2xl p-5 mb-5 border border-zinc-800 space-y-4">

          {/* Empty State */}
          {messages.length === 0 ? (
            <p className="text-zinc-500 text-center mt-40">
              Ask anything to your AI assistant...
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap leading-7 ${
                    msg.type === "user"
                      ? "bg-cyan-500 text-white"
                      : "bg-zinc-800 text-zinc-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}

          {/* Loading Message */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 text-zinc-300 px-4 py-3 rounded-2xl">
                Thinking...
              </div>
            </div>
          )}

          {/* Auto Scroll Ref */}
          <div ref={chatEndRef}></div>

        </div>

        {/* Input Section */}
        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleSend}
            className="bg-cyan-500 hover:bg-cyan-400 transition px-7 py-4 rounded-2xl font-semibold"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;