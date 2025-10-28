"use client";

import React, { useEffect, useRef, useState } from "react";
const icon = "/assets/chat-icon.png";
const icons2 = "/assets/icons2.svg";
const icons1 = "/assets/icons1.svg";
const icons03 = "/assets/icons03.svg";
type ChatMessage = {
  role: string;
  text?: string;
  content?: string;
};

function sanitizeLinksReact(text: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = urlRegex.exec(text)) !== null) {
    const url = match[0];
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a key={match.index} href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    );
    lastIndex = match.index + url.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
export default function ChatWidget() {
  const STORAGE_KEY = "chatHistory";
  const [messages, setMessages] = useState<ChatMessage[]>([]); // {role, text}
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // Inject minimal CSS for typing dots and sr-only helper (keeps component self-contained)
  useEffect(() => {
    const css = `
      .typing-dots { display:inline-flex; gap:6px; align-items:center; }
      .typing-dots span { display:inline-block; width:6px; height:6px; background:currentColor; border-radius:50%; opacity:0.25; transform:translateY(0); animation:dotPulse 1s infinite linear; }
      .typing-dots span:nth-child(1){ animation-delay:0s; }
      .typing-dots span:nth-child(2){ animation-delay:0.15s; }
      .typing-dots span:nth-child(3){ animation-delay:0.3s; }
      @keyframes dotPulse { 0% { opacity:0.25; transform:translateY(0);} 50%{ opacity:1; transform:translateY(-4px);} 100%{ opacity:0.25; transform:translateY(0);} }
      @media (prefers-reduced-motion: reduce) { .typing-dots span { animation: none; opacity: 0.7; transform: none; } }
      .sr-only { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
    `;
    const style = document.createElement("style");
    style.setAttribute("data-generated-by", "ChatWidget");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    return () => {
      try {
        document.head.removeChild(style);
      } catch (err) {
        console.debug("ChatWidget style cleanup error", err);
      }
    };
  }, []);

  useEffect(() => {
    // load history
    try {
      const hist: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      // normalize older entries that used `content` property -> map to `text` for the UI
      const normalized: ChatMessage[] = (hist || []).map((m: any) => ({
        role: String(m?.role ?? "user"),
        text:
          typeof m?.text === "string"
            ? m.text
            : typeof m?.content === "string"
              ? m.content
              : "",
      }));
      setMessages(normalized);
    } catch (err) {
      console.debug("ChatWidget load history error", err);
    }
    // warm up connection (fire-and-forget)
    (async function warmUp() {
      try {
        await fetch("https://chat-779e.onrender.com/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "system", content: "warmup" }],
          }),
        });
        // console.log("🔥 Chat server warmed up!");
      } catch (err) {
        console.debug("ChatWidget warmUp error", err);
      }
    })();
  }, []);

  useEffect(() => {
    // persist
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.debug("ChatWidget persist error", err);
    }
  }, [messages]);

  useEffect(() => {
    // scroll to bottom whenever messages change
    try {
      if (messagesRef.current) {
        const el = messagesRef.current;
        el.scrollTop = el.scrollHeight;
      }
    } catch (err) {
      console.debug("ChatWidget scroll error", err);
    }
  }, [messages]);

  function clearHistory() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.debug("ChatWidget clearHistory error", err);
    }
    setMessages([]);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text) {
      // show a bot message for empty
      setMessages((m) => [
        ...m,
        { role: "bot", text: "⚠️ Message is empty. Please say something." },
      ]);
      return;
    }
    if (text.length > 300) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Your message is too long. Please shorten it." },
      ]);
      return;
    }

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setSending(true);
    setIsTyping(true);

    try {
      // Build payload that matches backend expectations: array of { role, content }
      const backendMessages = messages.map((m: ChatMessage) => ({
        role: m.role === "bot" ? "assistant" : m.role,
        content: m.text ?? m.content ?? "",
      }));
      backendMessages.push({ role: "user", content: text });

      const res = await fetch("https://chat-779e.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ messages: backendMessages }),
      });

      // If server returned non-2xx, read the body for details to surface in the UI
      if (!res.ok) {
        let errText = "";
        try {
          errText = await res.text();
        } catch (err) {
          console.debug("ChatWidget read error body", err);
        }
        throw new Error(
          `Server responded with ${res.status}: ${errText || res.statusText}`
        );
      }

      const data = await res.json();
      if (!data.reply) throw new Error("No valid response body from the bot.");
      // append reply and clear typing indicator
      setIsTyping(false);
      setMessages((m) => [...m, { role: "bot", text: String(data.reply) }]);
    } catch (err) {
      setIsTyping(false);
      const messageText = err instanceof Error ? err.message : String(err);
      setMessages((m) => [
        ...m,
        { role: "bot", text: `🤖 Error while connecting: ${messageText}` },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        id="chat-toggle"
        type="button"
        onClick={() => setOpen(true)}
        style={{ display: open ? "none" : "block" }}
      >
        <img src={icon} alt="chat Logo" width="50px" height="31px" />
      </button>

      <div id="chat-box" style={{ display: open ? "flex" : "none" }}>
        <div id="chat-header">
          <span>
            <img className="img707" src={icons03} alt="icons03" />
          </span>
          <button id="clear-btn" title="Clear Chat" onClick={clearHistory}>
            <img className="img708" src={icons1} alt="icons1" />
          </button>
          <button id="close-btn" title="Close" onClick={() => setOpen(false)}>
            <img className="img709" src={icons2} alt="icons2" />
          </button>
        </div>

        <div
          id="chat-messages"
          ref={messagesRef}
          style={{ overflowY: "auto", maxHeight: 300 }}
        >
          {messages.map((m, idx) => (
            <div
              className={`bubble ${m.role}`}
              key={idx}
              style={{ animation: "fadeInUp 0.4s ease-out" }}
            >
              <div className="bubble-content">
                {typeof m.text === "string"
                  ? sanitizeLinksReact(m.text)
                  : m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div
              className={`bubble bot`}
              key="typing"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="bubble-content">
                <span className="typing-dots" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <span className="sr-only">Bot is typing…</span>
              </div>
            </div>
          )}
        </div>

        <div id="chat-input">
          <input
            type="text"
            id="user-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!sending) sendMessage();
              }
            }}
          />
          <button
            type="button"
            id="send-btn"
            title="send-btn"
            onClick={() => !sending && sendMessage()}
            disabled={sending}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-icon"
              style={{
                width: "1em",
                height: "1em",
                verticalAlign: "middle",
                fill: "currentColor",
                overflow: "hidden",
              }}
              viewBox="0 0 1024 1024"
              version="1.1"
            >
              <path d="M41.353846 876.307692l86.646154-320.984615h366.276923c9.846154 0 19.692308-9.846154 19.692308-19.692308v-39.384615c0-9.846154-9.846154-19.692308-19.692308-19.692308H128l-84.676923-315.076923C41.353846 157.538462 39.384615 151.630769 39.384615 145.723077c0-13.784615 13.784615-27.569231 29.538462-25.6 3.938462 0 5.907692 1.969231 9.846154 1.969231l886.153846 364.307692c11.815385 3.938462 19.692308 15.753846 19.692308 27.569231s-7.876923 21.661538-17.723077 25.6L78.769231 913.723077c-3.938462 1.969231-7.876923 1.969231-11.815385 1.969231-15.753846-1.969231-27.569231-13.784615-27.569231-29.538462 0-3.938462 0-5.907692 1.969231-9.846154z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
