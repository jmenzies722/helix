"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

const transport = new DefaultChatTransport({ api: "/api/chat" });

function messageText(parts: { type: string; text?: string }[]) {
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("");
}

export function Chat() {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status, error, stop, regenerate } = useChat({
    transport,
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) {
      return;
    }
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  function submit() {
    const text = input.trim();
    if (!text || busy) {
      return;
    }
    sendMessage({ text });
    setInput("");
  }

  return (
    <div className="chat-shell">
      <header className="chat-header">
        <div>
          <h1>Helix</h1>
          <p>CTO, Shua Labs</p>
        </div>
      </header>

      <div className="chat-thread" role="log" aria-live="polite">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <p className="chat-empty-title">Text Helix</p>
            <p>
              Type a message below. Ask about the stack, a decision, or what to
              do next.
            </p>
          </div>
        ) : (
          <ol className="chat-messages">
            {messages.map((message) => {
              const text = messageText(message.parts);
              if (!text && message.role === "assistant") {
                return null;
              }
              return (
                <li
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "chat-bubble chat-bubble-user"
                      : "chat-bubble chat-bubble-helix"
                  }
                >
                  <span className="chat-role">
                    {message.role === "user" ? "You" : "Helix"}
                  </span>
                  <div className="chat-text">
                    {message.parts.map((part, index) =>
                      part.type === "text" ? (
                        <span key={`${message.id}-${index}`}>{part.text}</span>
                      ) : null,
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        {status === "submitted" ? (
          <p className="chat-status" aria-live="polite">
            Helix is thinking…
          </p>
        ) : null}

        {error ? (
          <div className="chat-error" role="alert">
            <p>Helix could not reply. Try again.</p>
            <button type="button" onClick={() => regenerate()}>
              Retry
            </button>
          </div>
        ) : null}

        <div ref={endRef} />
      </div>

      <form
        className="chat-composer"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label className="sr-only" htmlFor="helix-message">
          Message Helix
        </label>
        <textarea
          id="helix-message"
          ref={textareaRef}
          rows={1}
          value={input}
          placeholder="Message Helix…"
          autoComplete="off"
          enterKeyHint="send"
          disabled={error != null}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
        />
        {busy ? (
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        ) : (
          <button type="submit" disabled={!input.trim() || error != null}>
            Send
          </button>
        )}
      </form>
    </div>
  );
}
