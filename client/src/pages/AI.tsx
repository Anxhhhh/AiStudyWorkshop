import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Send,
  Sparkles,
  BookOpen,
  Zap,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Plus,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 'm0',
    role: 'assistant',
    content: "Hi Ansh! I'm your AI study assistant. I can help you summarize notes, explain concepts, generate quizzes, create study plans, or answer any questions. What would you like to work on today?",
    timestamp: 'Just now',
  },
];

const suggestions = [
  'Summarize my Data Structures notes',
  'Generate a quiz on Algorithm Complexity',
  'Create a 7-day study plan for System Design',
  'Explain the CAP theorem simply',
  'What topics should I review before my exam?',
];

const sidebarCards = [
  {
    icon: <BookOpen size={14} />,
    title: 'Summarize Notes',
    desc: 'Turn your notes into a concise summary',
    color: 'var(--accent-blue-dim)',
    iconColor: 'var(--accent-blue)',
  },
  {
    icon: <Zap size={14} />,
    title: 'Generate Quiz',
    desc: 'Practice with AI-generated questions',
    color: 'var(--accent-purple-dim)',
    iconColor: '#a78bfa',
  },
  {
    icon: <Sparkles size={14} />,
    title: 'Study Plan',
    desc: 'Get a personalized study schedule',
    color: 'var(--color-warning-dim)',
    iconColor: 'var(--color-warning)',
  },
  {
    icon: <RefreshCw size={14} />,
    title: 'Flashcards',
    desc: 'Create spaced repetition flashcards',
    color: 'var(--color-success-dim)',
    iconColor: 'var(--color-success)',
  },
];

const AI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: 'Just now',
    };
    const aiReply: Message = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: `Great question! Here's what I know about "${input.trim()}":\n\nThis is a simulated AI response. In the full implementation, this will connect to your AI backend to provide intelligent, context-aware answers based on your study notes and goals.`,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg, aiReply]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      className="ai-page-layout"
      style={{ height: 'calc(100vh - 64px - 80px)' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Chat Area */}
      <div className="ai-chat-area">
        {/* Chat Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div className="ai-icon-wrap" style={{ width: 32, height: 32 }}>
            <Brain size={15} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
              AI Study Assistant
            </div>
            <div style={{ fontSize: 11, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }} />
              Online
            </div>
          </div>
          <button className="btn-icon" style={{ marginLeft: 'auto' }}>
            <Plus size={15} />
          </button>
        </div>

        {/* Messages */}
        <div className="ai-messages">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              className={`ai-message ${msg.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div
                className="message-avatar"
                style={{
                  background:
                    msg.role === 'assistant'
                      ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))'
                      : 'var(--bg-hover)',
                  border: msg.role === 'user' ? '1px solid var(--border-default)' : 'none',
                }}
              >
                {msg.role === 'assistant' ? <Brain size={14} color="#fff" /> : 'A'}
              </div>
              <div>
                <div className={`message-bubble ${msg.role}`}>
                  {msg.content.split('\n').map((line, li) => (
                    <React.Fragment key={li}>
                      {line}
                      {li < msg.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                {msg.role === 'assistant' && (
                  <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                    <button className="btn-icon" style={{ width: 24, height: 24 }} title="Copy">
                      <Copy size={11} />
                    </button>
                    <button className="btn-icon" style={{ width: 24, height: 24 }} title="Good">
                      <ThumbsUp size={11} />
                    </button>
                    <button className="btn-icon" style={{ width: 24, height: 24 }} title="Bad">
                      <ThumbsDown size={11} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div
            style={{
              padding: '0 20px 12px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
            }}
          >
            {suggestions.map((s) => (
              <button
                key={s}
                className="chip chip-blue"
                style={{ cursor: 'pointer', padding: '5px 10px', fontSize: 12 }}
                onClick={() => setInput(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="ai-input-area">
          <textarea
            className="ai-input"
            placeholder="Ask me anything about your studies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <motion.button
            className="btn btn-primary"
            style={{ padding: '10px 14px', height: 44, flexShrink: 0 }}
            onClick={handleSend}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={!input.trim()}
          >
            <Send size={14} />
          </motion.button>
        </div>
      </div>

      {/* Sidebar Panel */}
      <div className="ai-sidebar-panel">
        <div className="section-title">AI Tools</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sidebarCards.map((card) => (
            <motion.div
              key={card.title}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 14,
                cursor: 'pointer',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}
              whileHover={{ y: -2, borderColor: 'var(--border-strong)' }}
              transition={{ duration: 0.15 }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: card.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.iconColor,
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                  {card.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent AI Activity */}
        <div style={{ marginTop: 8 }}>
          <div className="section-title" style={{ marginBottom: 10 }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Summarized DSA notes',
              'Quiz: Algorithm Complexity',
              'Study plan generated',
            ].map((item) => (
              <div
                key={item}
                style={{
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <Sparkles size={11} color="var(--accent-purple)" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AI;
