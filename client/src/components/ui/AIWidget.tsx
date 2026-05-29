import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight } from 'lucide-react';

interface AIWidgetProps {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}

const AIWidget: React.FC<AIWidgetProps> = ({ title, body, actionLabel = 'View', onAction }) => {
  return (
    <motion.div
      className="ai-widget"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={onAction}
    >
      <div className="ai-icon-wrap">
        <Brain size={16} color="#fff" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="ai-title">{title}</div>
        <div className="ai-body">{body}</div>
        {actionLabel && (
          <button
            className="btn"
            style={{
              marginTop: 10,
              fontSize: 12,
              color: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: 0,
              background: 'none',
            }}
          >
            {actionLabel}
            <ArrowRight size={12} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AIWidget;
