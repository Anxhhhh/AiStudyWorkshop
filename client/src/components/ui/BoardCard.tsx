import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Brain } from 'lucide-react';

export interface BoardCardData {
  id: string;
  title: string;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignee?: string;
  hasAI?: boolean;
  description?: string;
}

interface BoardCardProps {
  card: BoardCardData;
}

const priorityConfig: Record<string, { label: string; cls: string }> = {
  high: { label: 'High', cls: 'chip-danger' },
  medium: { label: 'Medium', cls: 'chip-warning' },
  low: { label: 'Low', cls: 'chip-neutral' },
};

const BoardCard: React.FC<BoardCardProps> = ({ card }) => {
  const priority = card.priority ? priorityConfig[card.priority] : null;

  return (
    <motion.div
      className="kanban-card"
      id={`card-${card.id}`}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      layout
    >
      {/* Tags row */}
      {card.tags && card.tags.length > 0 && (
        <div className="card-tags">
          {card.tags.map((tag) => (
            <span key={tag} className="chip chip-neutral">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <div className="card-title" style={{ marginTop: card.tags?.length ? 10 : 0 }}>
        {card.title}
      </div>

      {/* Description */}
      {card.description && (
        <div
          style={{
            fontSize: 12,
            color: 'var(--text-tertiary)',
            lineHeight: 1.5,
            marginBottom: 4,
          }}
        >
          {card.description}
        </div>
      )}

      {/* Meta */}
      <div className="card-meta">
        {priority && (
          <span className={`chip ${priority.cls}`}>{priority.label}</span>
        )}

        {card.dueDate && (
          <span className="chip chip-neutral" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={9} />
            {card.dueDate}
          </span>
        )}

        {card.hasAI && (
          <span className="chip chip-purple" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Brain size={9} />
            AI
          </span>
        )}

        {card.assignee && (
          <span
            className="chip chip-neutral"
            style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <User size={9} />
            {card.assignee}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default BoardCard;
