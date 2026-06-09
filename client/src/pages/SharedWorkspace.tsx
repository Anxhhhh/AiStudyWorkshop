import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity } from 'lucide-react';

const SharedWorkspace: React.FC = () => {
  const members = [
    { id: 'u1', name: 'Ansh', initials: 'AR', online: true },
    { id: 'u2', name: 'Maya', initials: 'MZ', online: true },
    { id: 'u3', name: 'Liam', initials: 'LB', online: false },
  ];

  const sharedNotes = [
    { id: 's1', title: 'Team Study Plan', desc: 'Sprint schedule and milestones' },
    { id: 's2', title: 'Research Notes', desc: 'Papers and summaries' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 1100 }}>
      <div className="page-header">
        <h1 className="page-title">Shared Workspace</h1>
        <p className="page-subtitle">Collaborate with teammates and share study resources.</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Users size={16} />
            <div style={{ fontWeight: 700 }}>Members</div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {members.map((m) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-sidebar)', padding: '8px 10px', borderRadius: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,var(--accent-blue),var(--accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>{m.initials}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{m.online ? 'Online' : 'Offline'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 320, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Activity size={14} />
            <div style={{ fontWeight: 700 }}>Activity Feed</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Maya commented on "Research Notes"</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Ansh updated "Team Study Plan"</div>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: 16, borderRadius: 14 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Shared Notes</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sharedNotes.map((s) => (
            <div key={s.id} style={{ padding: 12, borderRadius: 10, background: 'var(--bg-sidebar)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{s.desc}</div>
              </div>
              <button className="btn btn-ghost">Open</button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SharedWorkspace;
