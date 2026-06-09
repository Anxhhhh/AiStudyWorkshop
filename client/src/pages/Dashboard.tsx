import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/useTaskStore';
import { useNoteStore } from '../store/useNoteStore';
import { motion, type Variants } from 'framer-motion';
import {
  CheckSquare,
  Brain,
  Plus,
  Target,
  BookOpen,
  Layers,
  TrendingUp,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import StatusColumn from '../components/ui/StatusColumn';
import AIWidget from '../components/ui/AIWidget';
import type { BoardCardData } from '../components/ui/BoardCard';

const columnConfig = [
  { id: 'not-started', label: 'Not Started', dotColor: '#52525b' },
  { id: 'in-progress', label: 'In Progress', dotColor: 'var(--accent-blue)' },
  { id: 'done', label: 'Done', dotColor: 'var(--color-success)' },
];

/* ─── Animation variants ─── */
const easeOut: [number, number, number, number] = [0.0, 0.0, 0.2, 1];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
};

/* ─── Component ─── */
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { tasks, fetchTasks } = useTaskStore();
  const { notes, fetchNotes } = useNoteStore();

  useEffect(() => {
    fetchTasks();
    fetchNotes();
  }, [fetchTasks, fetchNotes]);

  const kanbanData: Record<string, BoardCardData[]> = {
    'not-started': tasks.filter(t => t.status === 'Not Started' || t.status === 'not-started').map(t => ({ id: t.id, title: t.title, priority: 'medium' as any })),
    'in-progress': tasks.filter(t => t.status === 'In Progress' || t.status === 'in-progress').map(t => ({ id: t.id, title: t.title, priority: 'high' as any })),
    'done': tasks.filter(t => t.status === 'Done' || t.status === 'done').map(t => ({ id: t.id, title: t.title, priority: 'low' as any })),
  };

  const recentNotes = notes.slice(0, 3).map(n => ({
    id: n.id,
    title: n.title,
    preview: n.preview || (n.content && n.content.substring(0, 50)) || 'No content...',
    date: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Just now'
  }));

  const upcomingTasks = tasks.filter(t => t.status !== 'Done' && t.status !== 'done').slice(0, 4).map(t => ({
    id: t.id,
    text: t.title,
    done: false,
    due: 'Pending'
  }));

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ maxWidth: 1100 }}
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="page-header">
        <h1 className="page-title">
          {greeting}, Ansh 👋
        </h1>
        <p className="page-subtitle">
          Here's what's on your plate today — stay focused and crush it.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="quick-actions">
        {[
          { icon: <Plus size={14} />, label: 'New Note', path: '/notes' },
          { icon: <CheckSquare size={14} />, label: 'New Task', path: '/tasks' },
          { icon: <Brain size={14} />, label: 'Ask AI', path: '/ai' },
          { icon: <Target size={14} />, label: 'Set Goal', path: '/goals' },
          { icon: <Layers size={14} />, label: 'New Project', path: '/shared' },
        ].map((a) => (
          <button key={a.label} className="quick-action" onClick={() => navigate(a.path)}>
            {a.icon}
            {a.label}
          </button>
        ))}
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={itemVariants} className="grid-4" style={{ marginBottom: 40 }}>
        <StatCard
          icon={<BookOpen size={16} color="var(--accent-blue)" />}
          iconBg="var(--accent-blue-dim)"
          value={notes.length}
          label="Study Notes"
          trend={{ value: 'Updated from API', direction: 'up' }}
        />
        <StatCard
          icon={<CheckSquare size={16} color="var(--color-success)" />}
          iconBg="var(--color-success-dim)"
          value={tasks.filter(t => t.status === 'Done' || t.status === 'done').length}
          label="Tasks Done"
          trend={{ value: 'Updated from API', direction: 'up' }}
        />
        <StatCard
          icon={<TrendingUp size={16} color="var(--color-warning)" />}
          iconBg="var(--color-warning-dim)"
          value="84%"
          label="Goal Progress"
          trend={{ value: '+6% vs last week', direction: 'up' }}
        />
        <StatCard
          icon={<Clock size={16} color="var(--accent-purple)" />}
          iconBg="var(--accent-purple-dim)"
          value="4.2h"
          label="Study Time Today"
        />
      </motion.div>

      {/* Kanban Board */}
      <motion.div variants={itemVariants} style={{ marginBottom: 40 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>
          Active Projects
        </div>
        <div className="kanban-board">
          {columnConfig.map((col) => (
            <StatusColumn
              key={col.id}
              id={col.id}
              label={col.label}
              dotColor={col.dotColor}
              cards={kanbanData[col.id] || []}
            />
          ))}
        </div>
      </motion.div>

      {/* AI Recommendations + Recent Notes */}
      <motion.div variants={itemVariants} className="grid-2" style={{ marginBottom: 40 }}>
        {/* AI Panel */}
        <div>
          <div className="section-title" style={{ marginBottom: 12 }}>
            AI Recommendations
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <AIWidget
              title="Study Session Ready"
              body="Based on your schedule, now is a great time to tackle Data Structures. You have 2 hours before your next task."
              actionLabel="Start Session"
            />
            <AIWidget
              title="Quiz Suggestion"
              body="You haven't reviewed Algorithm Complexity in 5 days. Practice now to retain the concepts better."
              actionLabel="Take Quiz"
            />
          </div>
        </div>

        {/* Recent Notes */}
        <div>
          <div className="section-title" style={{ marginBottom: 12 }}>
            Recent Notes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentNotes.map((note) => (
              <div key={note.id} className="recent-note-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div className="recent-note-title">{note.title}</div>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)', flexShrink: 0, marginLeft: 8 }}>
                    {note.date}
                  </span>
                </div>
                <div className="recent-note-preview">{note.preview}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Upcoming Tasks */}
      <motion.div variants={itemVariants} style={{ marginBottom: 40 }}>
        <div className="section-title" style={{ marginBottom: 12 }}>
          Upcoming Tasks
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {upcomingTasks.map((task) => (
            <div key={task.id} className="task-list-item">
              <div className={`task-check ${task.done ? 'done' : ''}`}>
                {task.done && <CheckCircle2 size={10} color="#fff" />}
              </div>
              <span className={`task-text ${task.done ? 'done' : ''}`}>{task.text}</span>
              <span className="chip chip-neutral" style={{ marginLeft: 'auto' }}>
                {task.due}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
