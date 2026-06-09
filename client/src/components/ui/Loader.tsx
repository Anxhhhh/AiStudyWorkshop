import React from 'react';

const Loader: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <div className="spin" style={{ width: size, height: size, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.06)', borderTopColor: 'var(--accent-blue)' }} />
);

export default Loader;
