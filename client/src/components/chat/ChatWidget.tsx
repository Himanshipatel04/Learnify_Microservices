// components/chat/ChatWidget.tsx
import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { useChat } from "../../hooks/useChat";

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <Avatar label="AI" color="emerald" />
      <div className="bg-zinc-800 border border-zinc-700/60 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-3.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.75s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Avatar({ label, color }: { label: string; color: "emerald" | "indigo" }) {
  const cls =
    color === "emerald"
      ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
      : "bg-indigo-500/15 border-indigo-500/30 text-indigo-300";
  return (
    <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 text-[9px] font-bold ${cls}`}>
      {label}
    </div>
  );
}

function MessageBubble({ message }: { message: { role: string; content: string; isStreaming?: boolean } }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar label={isUser ? "You" : "AI"} color={isUser ? "indigo" : "emerald"} />
      <div
        className={`max-w-[78%] px-3.5 py-2.5 text-[13px] leading-relaxed rounded-2xl
          ${isUser
            ? "bg-indigo-600/80 text-white rounded-br-sm border border-indigo-500/30"
            : "bg-zinc-800 text-zinc-100 rounded-bl-sm border border-zinc-700/60"
          }`}
      >
        <p className="whitespace-pre-wrap wrap-break-word">{message.content}</p>
        {message.isStreaming && (
          <span className="inline-block w-0.5 h-3.5 bg-emerald-400 ml-0.5 align-middle animate-pulse" />
        )}
      </div>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, error, sendUserMessage, clearChat } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // ✅ FIX 1: refs for click-outside detection
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // ✅ FIX 1: close on outside click
  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendUserMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const awaitingFirstWord =
    isLoading &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "user";

  return (
    <>
      {/* ── Slide-in panel ── */}
      <div
     
        ref={panelRef}
        className={`fixed left-0 bottom-6 z-50 transition-all duration-300 ease-in-out
          ${open ? "translate-x-0 opacity-100 pointer-events-auto" : "-translate-x-full opacity-0 pointer-events-none"}`}
        style={{ marginLeft: "1rem" }}
      >
        <div
          className="flex flex-col bg-zinc-900 border border-zinc-700/70 rounded-2xl shadow-2xl overflow-hidden"
          style={{ width: "360px", height: "520px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700/60 bg-zinc-900/90 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold text-white tracking-wide">Learnify AI</span>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                  title="Clear chat"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-zinc-300">Ask me anything</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  I'm here to help with Learnify — projects, learning paths, mentors, and more.
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                {awaitingFirstWord && <TypingIndicator />}
                <div ref={bottomRef} />
              </>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mx-3 mb-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs shrink-0">
              {error}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 shrink-0 border-t border-zinc-700/60 pt-3">
            <div className="flex items-center gap-2 bg-zinc-800/80 border border-zinc-700/60 rounded-xl px-3 py-2 focus-within:border-emerald-500/50 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 resize-none outline-none leading-relaxed max-h-24 disabled:opacity-50"
                style={{ scrollbarWidth: "none" }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-7 h-7 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-white flex items-center justify-center transition-colors shrink-0 mb-0.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-zinc-600 text-center mt-1.5">
              Enter to send · Shift+Enter for newline
            </p>
          </div>
        </div>
      </div>

      {/* ── Floating trigger button — hidden while panel is open ── */}
      {/* ✅ FIX 2: render null when open so it can't block the panel */}
      {!open && (
        <button
          ref={triggerRef}
          onClick={() => setOpen(true)}
          className="fixed left-6 bottom-6 z-50 w-13 h-13 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 bg-emerald-500 hover:bg-emerald-400 hover:scale-110"
          style={{ width: "52px", height: "52px" }}
          title="Chat with Learnify AI"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </button>
      )}
    </>
  );
}