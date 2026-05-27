import React from 'react';
import Icon from './Icon';
import KanbanCard, { type KanbanCardData } from './KanbanCard';

interface ColumnConfig {
  id: string;
  label: string;
  dotColor: string;
  dotBorder: string;
  addBtnClass?: string;
}

const columns: ColumnConfig[] = [
  {
    id: 'not-started',
    label: 'Not started',
    dotColor: 'bg-surface-container-highest',
    dotBorder: 'border-outline',
  },
  {
    id: 'in-progress',
    label: 'In progress',
    dotColor: 'bg-primary-container',
    dotBorder: 'border-primary',
  },
  {
    id: 'done',
    label: 'Done',
    dotColor: 'bg-emerald-900',
    dotBorder: 'border-emerald-500',
    addBtnClass: 'text-emerald-700 hover:text-emerald-500 border-emerald-900 hover:border-emerald-700',
  },
];

// Sample data — this would come from your API in the real app
const sampleCards: Record<string, KanbanCardData[]> = {
  'not-started': [],
  'in-progress': [
    {
      id: 'ecommerce-1',
      title: 'e commerce',
      icon: 'search',
      hasAI: true,
    },
  ],
  'done': [],
};

const KanbanBoard: React.FC = () => {
  return (
    <div className="flex gap-4 items-start">
      {columns.map((col) => {
        const cards = sampleCards[col.id] || [];
        return (
          <div
            key={col.id}
            id={`column-${col.id}`}
            className="w-[300px] flex-shrink-0 flex flex-col gap-3"
          >
            {/* Column Header */}
            <div className="flex items-center gap-2 px-1">
              <div
                className={`w-2 h-2 rounded-full ${col.dotColor} border ${col.dotBorder}`}
              />
              <h3 className="text-xs font-semibold tracking-wide text-on-surface">
                {col.label}
              </h3>
              <span className="text-xs text-on-surface-variant">{cards.length}</span>
            </div>

            {/* Cards */}
            {cards.map((card) => (
              <KanbanCard key={card.id} card={card} />
            ))}

            {/* Add Button */}
            <button
              id={`add-${col.id}`}
              className={`w-full flex items-center gap-2 p-3 rounded-xl btn-add text-sm transition-all ${
                col.addBtnClass || ''
              }`}
            >
              <Icon name="add" className="text-sm" />
              New project
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
