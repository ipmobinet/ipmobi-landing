"use client";

import { useState, useEffect, useRef } from "react";

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState<{text: string; from: "you" | "them"}[]>([]);
  const [chatId, setChatId] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ipmobi_chat_id");
    if (saved) setChatId(saved);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // Poll for replies
  useEffect(() => {
    if (!chatId || !open) return;
    const interval = setInterval(async () => {
      try {
        const resp = await fetch(`https://api.ipmobi.net/api/chat/${chatId}`);
        const data = await resp.json();
        if (data.messages && data.messages.length > 0) {
          setChats(prev => {
            const existing = new Set(prev.map(c => c.text + c.from));
            const newMsgs = data.messages.filter((m: any) => !existing.has(m.text + m.from));
            return [...prev, ...newMsgs.map((m: any) => ({text: m.text, from: m.from}))];
          });
        }
      } catch {}
    }, 3000);
    return () => clearInterval(interval);
  }, [chatId, open]);

  const startChat = () => {
    const cid = "web_" + Math.random().toString(36).substring(2, 10);
    setChatId(cid);
    localStorage.setItem("ipmobi_chat_id", cid);
    setOpen(true);
    setChats([{ text: "Hi! 👋 How can I help you today?", from: "them" }]);
  };

  const sendMsg = async () => {
    if (!msg.trim()) return;
    setChats(prev => [...prev, { text: msg, from: "you" }]);
    const text = msg;
    setMsg("");
    try {
      await fetch("https://api.ipmobi.net/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, message: text, page: window.location.pathname }),
      });
    } catch {}
  };

  if (!chatId) {
    return (
      <div className="fixed bottom-24 right-6 z-[9999]">
        <button onClick={startChat} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 text-black font-medium shadow-xl hover:bg-emerald-400 transition-all shadow-emerald-500/20">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>
          Live Chat
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Floating button to toggle chat */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-[9999] w-12 h-12 rounded-full bg-emerald-500 text-black shadow-xl hover:bg-emerald-400 transition-all flex items-center justify-center text-xl shadow-emerald-500/20"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-36 right-6 z-[9999] w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0a0e1a] backdrop-blur-xl">
          {/* Header */}
          <div className="bg-emerald-500 p-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">S</div>
            <div>
              <p className="text-white text-sm font-semibold">IPMobi Support</p>
              <p className="text-white/70 text-xs">Usually replies in minutes</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-3">
            {chats.map((c, i) => (
              <div key={i} className={`flex ${c.from === "you" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  c.from === "you" ? "bg-emerald-500/20 text-emerald-300 rounded-br-md" : "bg-white/5 text-slate-300 rounded-bl-md"
                }`}>{c.text}</div>
              </div>
            ))}
            <div className="text-center"><p className="text-xs text-slate-600">Replies sent via Telegram</p></div>
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
              <button onClick={sendMsg} disabled={!msg.trim()} className="px-4 py-2.5 rounded-xl bg-emerald-500 text-black font-medium disabled:opacity-50 hover:bg-emerald-400 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
