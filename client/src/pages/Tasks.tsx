import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List, Plus, Filter, SortAsc } from 'lucide-react';
import StatusColumn from '../components/ui/StatusColumn';
import type { BoardCardData } from '../components/ui/BoardCard';
import { CheckCircle2 } from 'lucide-react';

/* ─── Sample Data ─── */
const tasksData: Record<string, BoardCardData[]> = {
  'not-started': [
    { id: 't-ns-1', title: 'Review Operating Systems Chapter 5', tags: ['OS'], priority: 'high', dueDate: 'Jun 3' },
    { id: 't-ns-2', title: 'Set up CI/CD pipeline for project', tags: ['DevOps'], priority: 'medium', dueDate: 'Jun 8' },
    { id: 't-ns-3', title: 'Read CAP theorem paper', tags: ['Distributed Systems'], priority: 'low' },
  ],
  'in-progress': [
    { id: 't-ip-1', title: 'Algorithm Study Plan — Week 3', tags: ['DSA'], priority: 'high', dueDate: 'May 30', hasAI: true },
    { id: 't-ip-2', title: 'Spring Boot REST API', tags: ['Backend'], priority: 'medium', dueDate: 'Jun 1' },
    { id: 't-ip-3', title: 'AI Workspace frontend', tags: ['React', 'UI'], priority: 'high', hasAI: true },
  ],
  done: [
    { id: 't-d-1', title: 'Data Structures — Arrays & Linked Lists', tags: ['DSA'], priority: 'low' },
    { id: 't-d-2', title: 'Project kickoff meeting notes', tags: ['Meetings'] },
    { id: 't-d-3', title: 'Set up GitHub repository', tags: ['DevOps'] },
  ],
};

const listTasks = [
  { id: 'l1', text: 'Review OS Chapter 5', priority: 'high', due: 'Jun 3', done: false },
  { id: 'l2', text: 'Submit project proposal', priority: 'medium', due: 'Today', done: false },
  { id: 'l3', text: 'Algorithm Week 3 exercises', priority: 'high', due: 'May 30', done: false },
  { id: 'l4', text: 'Data Structures Arrays notes', priority: 'low', due: 'Done', done: true },
  { id: 'l5', text: 'Set up CI/CD pipeline', priority: 'medium', due: 'Jun 8', done: false },
  { id: 'l6', text: 'Spring Boot REST endpoints', priority: 'medium', due: 'Jun 1', done: false },
  { id: 'l7', text: 'GitHub repository setup', priority: 'low', due: 'Done', done: true },
];

const columnConfig = [
  { id: 'not-started', label: 'Not Started', dotColor: '#52525b' },
  { id: 'in-progress', label: 'In Progress', dotColor: 'var(--accent-blue)' },
  { id: 'done', label: 'Done', dotColor: 'var(--color-success)' },
];

const priorityChip: Record<string, string> = {
  high: 'chip-danger',
  medium: 'chip-warning',
  low: 'chip-neutral',
};

const Tasks: React.FC = () => {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{ maxWidth: 1100 }}
    >
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Tasks</h1>
        <p className="page-subtitle">Manage your study tasks and projects across all areas.</p>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {/* View Toggle */}
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            className={`view-tab ${view === 'kanban' ? 'active' : ''}`}
            onClick={() => setView('kanban')}
          >
            <LayoutGrid size={13} />
            Board
          </button>
          <button
            className={`view-tab ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            <List size={13} />
            List
          </button>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" style={{ gap: 6 }}>
            <Filter size={13} />
            Filter
          </button>
          <button className="btn btn-ghost" style={{ gap: 6 }}>
            <SortAsc size={13} />
            Sort
          </button>
          <button className="btn btn-primary" style={{ gap: 6 }}>
            <Plus size={13} />
            New Task
          </button>
        </div>
      </div>

      {/* Content */}
      {view === 'kanban' ? (
        <div className="kanban-board">
          {columnConfig.map((col) => (
            <StatusColumn
              key={col.id}
              id={col.id}
              label={col.label}
              dotColor={col.dotColor}
              cards={tasksData[col.id] || []}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
        >
          {listTasks.map((task, i) => (
            <motion.div
              key={task.id}
              className="task-list-item"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className={`task-check ${task.done ? 'done' : ''}`}>
                {task.done && <CheckCircle2 size={10} color="#fff" />}
              </div>
              <span className={`task-text ${task.done ? 'done' : ''}`}>
                {task.text}
              </span>
              <span className={`chip ${priorityChip[task.priority]} `} style={{ fontSize: 10 }}>
                {task.priority}
              </span>
              <span className="chip chip-neutral" style={{ fontSize: 10, minWidth: 52, justifyContent: 'center' }}>
                {task.due}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Tasks;
