import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC<{ value?: string; onChange?: (v: string) => void; placeholder?: string }> = ({ value = '', onChange, placeholder = 'Search...' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-input)', padding: '6px 10px', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
      <Search size={14} color="var(--text-tertiary)" />
      <input value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%' }} />
    </div>
  );
};

export default SearchBar;
