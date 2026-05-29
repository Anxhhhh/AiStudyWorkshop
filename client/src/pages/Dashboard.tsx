import React from 'react';
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

/* ─── Sample Data ─── */
const kanbanData: Record<string, BoardCardData[]> = {
  'not-started': [
    {
      id: 'ns-1',
      title: 'Review Operating Systems Chapter 4',
      tags: ['OS', 'Theory'],
      priority: 'high',
      dueDate: 'Jun 3',
      assignee: 'AR',
    },
    {
      id: 'ns-2',
      title: 'Set up Docker for backend service',
      tags: ['DevOps'],
      priority: 'medium',
      dueDate: 'Jun 5',
      hasAI: true,
    },
  ],
  'in-progress': [
    {
      id: 'ip-1',
      title: 'Algorithm Study Plan — Week 3',
      tags: ['DSA'],
      priority: 'high',
      dueDate: 'May 30',
      hasAI: true,
      assignee: 'AR',
    },
    {
      id: 'ip-2',
      title: 'Spring Boot REST API endpoints',
      tags: ['Backend', 'Java'],
      priority: 'medium',
      dueDate: 'Jun 1',
    },
    {
      id: 'ip-3',
      title: 'Frontend component architecture',
      tags: ['React', 'UI'],
      priority: 'medium',
      hasAI: true,
    },
  ],
  done: [
    {
      id: 'd-1',
      title: 'Data Structures — Arrays & Linked Lists',
      tags: ['DSA'],
      priority: 'low',
    },
    {
      id: 'd-2',
      title: 'Project kickoff meeting notes',
      tags: ['Meetings'],
    },
  ],
};

const columnConfig = [
  { id: 'not-started', label: 'Not Started', dotColor: '#52525b' },
  { id: 'in-progress', label: 'In Progress', dotColor: 'var(--accent-blue)' },
  { id: 'done', label: 'Done', dotColor: 'var(--color-success)' },
];

const recentNotes = [
  { id: 'n1', title: 'Data Structures Notes', preview: 'Arrays provide O(1) access time. Linked lists allow dynamic memory...', date: '2h ago' },
  { id: 'n2', title: 'Algorithm Complexity', preview: 'Big O notation describes the upper bound of time complexity...', date: 'Yesterday' },
  { id: 'n3', title: 'System Design Basics', preview: 'Scalability, reliability, and availability are core pillars...', date: '3d ago' },
];

const upcomingTasks = [
  { id: 't1', text: 'Submit project proposal', done: false, due: 'Today' },
  { id: 't2', text: 'Review pull request #42', done: false, due: 'Tomorrow' },
  { id: 't3', text: 'Data structures quiz prep', done: true, due: 'Done' },
  { id: 't4', text: 'Write OS concepts summary', done: false, due: 'Jun 2' },
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
          { icon: <Plus size={14} />, label: 'New Note' },
          { icon: <CheckSquare size={14} />, label: 'New Task' },
          { icon: <Brain size={14} />, label: 'Ask AI' },
          { icon: <Target size={14} />, label: 'Set Goal' },
          { icon: <Layers size={14} />, label: 'New Project' },
        ].map((a) => (
          <button key={a.label} className="quick-action">
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
          value={12}
          label="Study Notes"
          trend={{ value: '+3 this week', direction: 'up' }}
        />
        <StatCard
          icon={<CheckSquare size={16} color="var(--color-success)" />}
          iconBg="var(--color-success-dim)"
          value={7}
          label="Tasks Done"
          trend={{ value: '+2 today', direction: 'up' }}
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
