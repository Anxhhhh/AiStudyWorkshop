import React from 'react';

const Breadcrumbs: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((it, i) => (
          <li key={it} style={{ color: i === items.length - 1 ? 'var(--text-primary)' : 'var(--text-tertiary)', fontWeight: i === items.length - 1 ? 600 : 400 }}>{it}</li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
