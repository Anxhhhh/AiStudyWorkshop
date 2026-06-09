import React from 'react';
import { motion } from 'framer-motion';
import { User, Activity } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 900 }}>
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Manage your account and view productivity insights.</p>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 320, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: 16 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 12, background: 'linear-gradient(135deg,var(--accent-blue),var(--accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22, fontWeight: 800 }}>AR</div>
            <div>
              <div style={{ fontWeight: 700 }}>Ansh Raj</div>
              <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>ansh@workspace.dev</div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Member since Apr 2026</div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Productivity</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>4.2h</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Avg study time / day</div>
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>12</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Notes created</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Recent Activity</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Completed Algorithms practice</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Reviewed System Design notes</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
