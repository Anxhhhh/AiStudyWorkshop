import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileText } from 'lucide-react';

const Meetings: React.FC = () => {
  const meetings = [
    { id: 'm1', title: 'Sprint Planning', date: 'May 12', notes: 'Discuss tasks and milestones' },
    { id: 'm2', title: 'Project Kickoff', date: 'Apr 20', notes: 'Agree on architecture' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 1100 }}>
      <div className="page-header">
        <h1 className="page-title">Meeting Notes</h1>
        <p className="page-subtitle">Capture, search, and revisit meeting notes.</p>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontWeight: 700 }}>Upcoming Meetings</div>
            <button className="btn btn-primary">New Meeting</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {meetings.map((mt) => (
              <div key={mt.id} style={{ background: 'var(--bg-card)', padding: 12, borderRadius: 12, border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{mt.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{mt.date}</div>
                </div>
                <button className="btn btn-ghost">Open</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 320 }}>
          <div style={{ background: 'var(--bg-card)', padding: 12, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Search meetings</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="form-input" placeholder="Search..." />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Meetings;
