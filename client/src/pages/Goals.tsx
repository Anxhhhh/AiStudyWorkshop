import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckSquare } from 'lucide-react';

const Goals: React.FC = () => {
  const goals = [
    { id: 'g1', title: 'Master Data Structures', progress: 64, deadline: 'Jun 15' },
    { id: 'g2', title: 'Prepare for System Design interview', progress: 28, deadline: 'Jul 1' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 1100 }}>
      <div className="page-header">
        <h1 className="page-title">Goals</h1>
        <p className="page-subtitle">Track your long-term study goals and milestones.</p>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {goals.map((g) => (
          <div key={g.id} style={{ width: 320, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Target size={16} />
              <div style={{ fontWeight: 700 }}>{g.title}</div>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 8, marginTop: 12, overflow: 'hidden' }}>
              <div style={{ width: `${g.progress}%`, height: '100%', background: 'linear-gradient(90deg,var(--accent-blue),var(--accent-purple))' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, color: 'var(--text-tertiary)', fontSize: 13 }}>
              <div>{g.progress}%</div>
              <div>Due {g.deadline}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontWeight: 700 }}>Milestones</div>
          <button className="btn btn-primary">New Milestone</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: 'var(--bg-card)', padding: 12, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckSquare size={14} />
              <div style={{ fontWeight: 600 }}>Finish Arrays module</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 6 }}>Completed May 10</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Goals;
