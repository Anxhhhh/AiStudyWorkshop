import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 900 }}>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage account, security, and workspace preferences.</p>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 320, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Account</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Email: ansh@workspace.dev</div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Shield size={16} />
              <div style={{ fontWeight: 700 }}>Security</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Two-factor authentication</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Protect your account with an additional verification step.</div>
                </div>
                <button className="btn btn-ghost">Enable</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Change password</div>
                </div>
                <button className="btn btn-ghost">Change</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12, background: 'var(--bg-card)', padding: 16, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700 }}>Appearance</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8 }}>Dark theme is enabled. Coming soon: theme presets.</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
