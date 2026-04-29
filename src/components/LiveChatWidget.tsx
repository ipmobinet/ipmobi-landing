"use client";

import { useState, useEffect, useRef } from "react";

// Telegram inline widget that opens chat with your bot
export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState<{text: string; from: "you" | "them"}[]>([]);
  const [chatId, setChatId] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has an existing chat session
    const saved = localStorage.getItem("ipmobi_chat_id");
    if (saved) setChatId(saved);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const startChat = () => {
    // Generate a unique chat ID for this visitor
    const cid = "web_" + Math.random().toString(36).substring(2, 10);
    setChatId(cid);
    localStorage.setItem("ipmobi_chat_id", cid);
    
    // Add intro message
    setChats([{
      text: "Hi! 👋 How can I help you today?",
      from: "them"
    }]);
  };

  const sendMsg = async () => {
    if (!msg.trim()) return;
    
    // Add to local chat
    setChats(prev => [...prev, {text: msg, from: "you"}]);
    setMsg("");

    // Send to Telegram bot (it forwards to you)
    try {
      await fetch("https://api.ipmobi.net/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          chat_id: chatId,
          message: msg,
          page: window.location.pathname,
        }),
      });
    } catch {}
  };

  if (!chatId) {
    return (
      <div className="fixed bottom-24 right-6 z-[9999]">
        <button
          onClick={startChat}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 text-black font-medium shadow-xl hover:bg-emerald-400 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
          </svg>
          Live Chat
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-[9999] w-80 sm:w-96">
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0a0e1a] backdrop-blur-xl">
        {/* Header */}
        <div className="bg-emerald-500 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">IPMobi Support</p>
              <p className="text-white/70 text-xs">Usually replies in minutes</p>
            </div>
          </div>
          <button onClick={() => setChatId("")} className="text-white/70 hover:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto p-4 space-y-3">
          {chats.map((c, i) => (
            <div key={i} className={`flex ${c.from === "you" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                c.from === "you" 
                  ? "bg-emerald-500/20 text-emerald-300 rounded-br-md" 
                  : "bg-white/5 text-slate-300 rounded-bl-md"
              }`}>
                {c.text}
              </div>
            </div>
          ))}
          {/* Auto-reply indicator */}
          <div className="text-center">
            <p className="text-xs text-slate-600">Responses sent via Telegram — you'll get a reply fast</p>
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            <button
              onClick={sendMsg}
              disabled={!msg.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 text-black font-medium disabled:opacity-50 hover:bg-emerald-400 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
