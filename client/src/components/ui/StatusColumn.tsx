import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import BoardCard, { type BoardCardData } from './BoardCard';

interface StatusColumnProps {
  id: string;
  label: string;
  dotColor: string;
  cards: BoardCardData[];
  onAddCard?: () => void;
}

const StatusColumn: React.FC<StatusColumnProps> = ({
  id,
  label,
  dotColor,
  cards,
  onAddCard,
}) => {
  return (
    <motion.div
      className="kanban-column"
      id={`column-${id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      layout
    >
      {/* Column header */}
      <div className="column-header">
        <div className="column-dot" style={{ backgroundColor: dotColor }} />
        <span className="column-label">{label}</span>
        <span className="column-count">{cards.length}</span>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <BoardCard card={card} />
          </motion.div>
        ))}
      </div>

      {/* Add card button */}
      <motion.button
        className="btn-add"
        id={`add-${id}`}
        onClick={onAddCard}
        style={{ marginTop: 8 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Plus size={13} />
        Add task
      </motion.button>
    </motion.div>
  );
};

export default StatusColumn;
