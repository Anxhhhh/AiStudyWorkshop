import React from 'react';

const EmptyState: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({ title, subtitle, action }) => {
  return (
    <div style={{ background: 'var(--bg-card)', padding: 28, borderRadius: 12, border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{title}</div>
      {subtitle && <div style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>{subtitle}</div>}
      {action}
    </div>
  );
};

export default EmptyState;
