"use client";

import { useState } from "react";

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Telegram Button (always visible) */}
      <a
        href="https://t.me/IPMobiNetBot"
        target="_blank"
        rel="noopener noreferrer"
        className="telegram-float"
        aria-label="Contact us on Telegram"
      >
        <span className="pulse" />
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.127.087.669.087.669l-1.488 7.013c-.123.555-.456.69-.771.44-.346-.275-2.148-1.4-2.574-1.666-.346-.216-.688-.324-.06-.58l3.123-2.1c.34-.25.174-.535-.19-.314l-4.656 3c-.29.175-.554.1-.647-.12l-1.26-3.123c-.225-.543.107-.766.44-.913.28-.123.547-.17.855-.034l4.198 1.685c.36.128.69-.043.542-.33L8.557 8.137c-.165-.307.034-.648.335-.733.53-.154 1-.333 1.677-.546.688-.218 1.288-.412 1.755-.662.54-.293.72-.12.72-.12s.273.048.462.132z"/>
        </svg>
      </a>

      {/* Live Chat Button */}
      <button
        onClick={() => {
          setOpen(!open);
          if (!open) {
            window.open("https://t.me/IPMobiNetBot", "_blank");
          }
        }}
        className="fixed bottom-24 right-6 z-[9999] flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 text-black font-medium shadow-xl hover:bg-emerald-400 transition-all shadow-emerald-500/20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
        </svg>
        Live Chat
      </button>
    </>
  );
}
