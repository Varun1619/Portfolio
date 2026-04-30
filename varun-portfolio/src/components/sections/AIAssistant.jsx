import { useState, useRef, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────
// Varun's full profile — the AI reads this before every reply
// ─────────────────────────────────────────────
const VARUN_CONTEXT = `You are Varun Singh's AI portfolio assistant. You represent Varun professionally and help visitors learn about him.

ABOUT VARUN:
- MS in Information Systems at Northeastern University (GPA: 3.85)
- Data Engineer with expertise in building scalable data pipelines, ETL processes, and data architectures
- Currently seeking full-time Data Engineering roles

WORK EXPERIENCE:
1. Mass General Brigham (MGB) - Data Engineer
   - Built and maintained large-scale medical records data pipelines processing millions of records
   - Worked with Microsoft Fabric, Azure Data Factory, and Power BI
   - Developed ETL pipelines for healthcare analytics

2. LTI Mindtree - Data Engineer
   - Trained engineers on Apache Kafka for real-time data streaming
   - Built PySpark and Apache Spark pipelines for large-scale batch processing
   - Worked on data warehousing and lake house architectures

3. Nismotek - Junior Data Engineer
   - Built ETL processes and data transformation workflows
   - Worked with Python and SQL for data engineering tasks

TECHNICAL SKILLS:
- Big Data: Apache Spark, PySpark, Apache Kafka, Hadoop
- Cloud & Platforms: Microsoft Fabric, Azure, AWS basics
- Databases: SQL, PostgreSQL, MongoDB, Delta Lake
- Programming: Python, Java, SQL
- BI & Visualization: Power BI, Tableau
- Tools: Git, Docker, Airflow, dbt

KEY PROJECTS:
1. ETL Pipeline Simulator - Interactive web demo showing real-time data flowing through Extract, Transform, Load stages with data cleaning, email validation, and currency formatting
2. Real-time Kafka Streaming Pipeline - Built a streaming data pipeline processing live events using Apache Kafka and PySpark
3. Healthcare Data Warehouse - Designed and implemented a data warehouse for medical records at Mass General Brigham
4. Microsoft Fabric Analytics Platform - End-to-end analytics solution using MS Fabric for enterprise data

CONTACT:
- Portfolio: varunsinghdev.com
- Visitors can reach Varun through the contact section on his portfolio website
- Open to full-time Data Engineering opportunities

PERSONALITY GUIDELINES:
- Be friendly, professional, and enthusiastic about data engineering
- Keep responses concise (2-4 sentences max) but informative
- If asked something you do not know, say so honestly and direct them to contact Varun directly
- Speak about Varun in third person as his representative ("Varun worked at...", "He built...")
- Highlight his unique combination of healthcare data experience and big data expertise`;

const SUGGESTED_QUESTIONS = [
  "What's Varun's experience?",
  "What tech stack does he use?",
  "Tell me about his projects",
  "Is he open to work?",
];

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
function WaveformBars({ isActive, color = "#00f5d4" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "32px" }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "3px",
            borderRadius: "2px",
            background: color,
            height: isActive ? `${20 + Math.sin(i * 0.8) * 12}px` : "4px",
            animation: isActive
              ? `va-wave ${0.8 + (i % 5) * 0.15}s ease-in-out infinite alternate`
              : "none",
            animationDelay: `${i * 0.04}s`,
            transition: "height 0.3s ease",
            opacity: isActive ? 0.9 : 0.3,
          }}
        />
      ))}
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "2px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#00f5d4",
            animation: "va-bounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey there! 👋 I'm Varun's AI assistant. Ask me anything about his experience, projects, or skills — or tap the mic to use your voice!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);         // holds the ElevenLabs Audio object
  const messagesRef = useRef(messages);  // stable ref so recognition callback always has fresh messages

  // Keep messagesRef in sync
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Set up Web Speech API for voice input
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      sendMessage(transcript); // fire immediately after recognising speech
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  // ── ElevenLabs natural voice (routed through your Vercel proxy) ──
  const speak = useCallback(
    async (text) => {
      if (!voiceEnabled) return;
      try {
        setIsSpeaking(true);

        // POST to your /api/speak Vercel serverless function
        const res = await fetch("/api/speak", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!res.ok) throw new Error("Speech API error");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);

        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
        };
        audio.onerror = () => setIsSpeaking(false);

        audioRef.current = audio;
        audio.play();
      } catch {
        setIsSpeaking(false);
      }
    },
    [voiceEnabled]
  );

  const stopSpeaking = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    setIsSpeaking(false);
  };

  // ── Send message to Claude via your /api/chat Vercel proxy ──
  const sendMessage = useCallback(
    async (text) => {
      if (!text?.trim()) return;
      setInput("");
      setError(null);

      const currentMessages = messagesRef.current;
      const userMsg = { role: "user", content: text };
      const updatedMessages = [...currentMessages, userMsg];

      setMessages(updatedMessages);
      setIsLoading(true);

      try {
        // POST to your /api/chat Vercel serverless function
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: VARUN_CONTEXT,
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = await response.json();
        const reply =
          data.content?.[0]?.text || "Sorry, I couldn't get a response.";

        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        speak(reply);
      } catch {
        setError("Connection issue. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [speak]
  );

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking(); // stop any ongoing speech before listening
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes va-wave {
          from { height: 4px; }
          to   { height: 28px; }
        }
        @keyframes va-bounce {
          0%, 80%, 100% { transform: translateY(0);   opacity: 0.4; }
          40%            { transform: translateY(-6px); opacity: 1;   }
        }
        @keyframes va-fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes va-pulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0;   }
        }

        .va-panel {
          background: rgba(8, 20, 28, 0.98);
          border: 1px solid rgba(0,245,212,0.15);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 0 80px rgba(0,245,212,0.05), 0 24px 48px rgba(0,0,0,0.6);
          font-family: 'DM Sans', 'Inter', sans-serif;
        }

        /* Header */
        .va-header {
          padding: 14px 18px;
          border-bottom: 1px solid rgba(0,245,212,0.1);
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(0,245,212,0.04);
        }
        .va-orb {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00f5d4, #00a896);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          position: relative; flex-shrink: 0;
        }
        .va-orb::after {
          content: '';
          position: absolute; inset: -3px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,245,212,0.35);
          animation: va-pulse 2.5s ease-out infinite;
        }
        .va-header-text { flex: 1; }
        .va-header-text strong {
          display: block; color: #e8f4f8;
          font-size: 0.88rem; font-family: 'Space Mono', monospace;
        }
        .va-header-text span { color: #00f5d4; font-size: 0.7rem; opacity: 0.7; }
        .va-vtoggle {
          background: none;
          border: 1px solid rgba(0,245,212,0.2);
          border-radius: 6px;
          padding: 4px 9px;
          color: #7a9baa;
          font-size: 0.68rem;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .va-vtoggle.on { border-color: rgba(0,245,212,0.4); color: #00f5d4; }

        /* Messages */
        .va-messages {
          height: 260px;
          overflow-y: auto;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,245,212,0.15) transparent;
        }
        .va-msg { animation: va-fadeIn 0.3s ease; max-width: 88%; }
        .va-msg.user      { align-self: flex-end; }
        .va-msg.assistant { align-self: flex-start; }
        .va-bubble {
          padding: 9px 13px;
          border-radius: 12px;
          font-size: 0.86rem;
          line-height: 1.6;
        }
        .va-msg.user .va-bubble {
          background: linear-gradient(135deg, #00f5d4, #00c4a0);
          color: #050a0e; font-weight: 500;
          border-radius: 12px 12px 2px 12px;
        }
        .va-msg.assistant .va-bubble {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0,245,212,0.1);
          color: #c8dde6;
          border-radius: 12px 12px 12px 2px;
        }

        /* Suggestion chips */
        .va-chips {
          padding: 0 14px 10px;
          display: flex; gap: 6px; flex-wrap: wrap;
        }
        .va-chip {
          background: rgba(0,245,212,0.06);
          border: 1px solid rgba(0,245,212,0.14);
          color: #7a9baa;
          font-size: 0.7rem;
          padding: 4px 10px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .va-chip:hover {
          background: rgba(0,245,212,0.12);
          color: #00f5d4;
          border-color: rgba(0,245,212,0.3);
        }

        /* Status bars */
        .va-status {
          padding: 5px 14px;
          display: flex; align-items: center; gap: 8px;
          font-size: 0.7rem;
          border-top: 1px solid rgba(0,245,212,0.08);
        }
        .va-status.speaking  { color: #00f5d4; background: rgba(0,245,212,0.03); }
        .va-status.listening { color: #ff7070; background: rgba(255,80,80,0.03); }
        .va-stop {
          margin-left: auto;
          background: none;
          border: 1px solid currentColor;
          color: inherit;
          font-size: 0.62rem;
          padding: 2px 7px;
          border-radius: 4px;
          cursor: pointer;
          opacity: 0.7;
        }

        /* Error */
        .va-error {
          margin: 0 14px 8px;
          padding: 7px 11px;
          background: rgba(255,80,80,0.08);
          border: 1px solid rgba(255,80,80,0.2);
          border-radius: 8px;
          color: #ff7070; font-size: 0.76rem;
        }

        /* Input row */
        .va-input-row {
          padding: 10px 14px;
          border-top: 1px solid rgba(0,245,212,0.1);
          display: flex; gap: 7px; align-items: center;
          background: rgba(0,0,0,0.2);
        }
        .va-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0,245,212,0.14);
          border-radius: 10px;
          padding: 9px 13px;
          color: #e8f4f8;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .va-input:focus { border-color: rgba(0,245,212,0.38); }
        .va-input::placeholder { color: #3a5a6a; }

        .va-mic {
          width: 40px; height: 40px;
          border-radius: 10px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; transition: all 0.2s;
          flex-shrink: 0; position: relative;
          border: 1px solid rgba(0,245,212,0.2);
          background: rgba(0,245,212,0.08);
        }
        .va-mic.listening {
          background: rgba(255,80,80,0.15);
          border-color: rgba(255,80,80,0.4);
        }
        .va-mic.listening::before {
          content: '';
          position: absolute; inset: -4px;
          border-radius: 14px;
          border: 2px solid rgba(255,80,80,0.25);
          animation: va-pulse 1s ease-out infinite;
        }

        .va-send {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #00f5d4, #00a896);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; flex-shrink: 0;
        }
        .va-send:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,245,212,0.3);
        }
        .va-send:disabled { opacity: 0.35; cursor: not-allowed; }
      `}</style>

      <div className="va-panel">
        {/* Header */}
        <div className="va-header">
          <div className="va-orb">🤖</div>
          <div className="va-header-text">
            <strong>Varun's AI Assistant</strong>
            <span>Ask me anything about Varun</span>
          </div>
          <button
            className={`va-vtoggle ${voiceEnabled ? "on" : ""}`}
            onClick={() => {
              setVoiceEnabled((v) => !v);
              stopSpeaking();
            }}
          >
            {voiceEnabled ? "🔊 Voice ON" : "🔇 Voice OFF"}
          </button>
        </div>

        {/* Messages */}
        <div className="va-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`va-msg ${msg.role}`}>
              <div className="va-bubble">{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="va-msg assistant">
              <div className="va-bubble">
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion chips — only shown on first load */}
        {messages.length <= 1 && (
          <div className="va-chips">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button key={q} className="va-chip" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="va-status speaking">
            <WaveformBars isActive={true} />
            <span>Speaking...</span>
            <button className="va-stop" onClick={stopSpeaking}>
              ■ Stop
            </button>
          </div>
        )}

        {/* Listening indicator */}
        {isListening && !isSpeaking && (
          <div className="va-status listening">
            <WaveformBars isActive={true} color="#ff7070" />
            <span>Listening...</span>
          </div>
        )}

        {error && <div className="va-error">{error}</div>}

        {/* Input row */}
        <div className="va-input-row">
          <input
            className="va-input"
            placeholder="Ask about experience, skills, projects..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className={`va-mic ${isListening ? "listening" : ""}`}
            onClick={toggleListening}
            title={isListening ? "Stop listening" : "Speak your question"}
          >
            {isListening ? "⏹" : "🎤"}
          </button>
          <button
            className="va-send"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13"
                stroke="#050a0e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="#050a0e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}