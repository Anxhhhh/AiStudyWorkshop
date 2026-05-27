import React from 'react';
import Icon from './Icon';

export interface KanbanCardData {
  id: string;
  title: string;
  icon: string;
  hasAI?: boolean;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

interface KanbanCardProps {
  card: KanbanCardData;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ card }) => {
  return (
    <div className="kanban-card group" id={`card-${card.id}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon name={card.icon} className="text-primary text-lg" />
          <span className="text-sm font-medium text-on-surface">{card.title}</span>
        </div>
        {/* Hover actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button className="icon-btn p-0.5">
            <Icon name="edit" className="text-sm text-on-surface-variant hover:text-white" />
          </button>
        </div>
      </div>

      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="status-chip bg-surface-container-high text-on-surface-variant"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer indicators */}
      <div className="flex items-center gap-2 mt-3">
        {card.hasAI && (
          <Icon name="smart_toy" className="text-xs text-secondary-container" />
        )}
        {card.priority && (
          <span
            className={`status-chip ${
              card.priority === 'high'
                ? 'bg-error-container/20 text-error'
                : card.priority === 'medium'
                ? 'bg-tertiary-container/20 text-tertiary'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            {card.priority}
          </span>
        )}
      </div>
    </div>
  );
};

export default KanbanCard;
