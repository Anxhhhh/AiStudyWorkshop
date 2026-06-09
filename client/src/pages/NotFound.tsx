import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh', flexDirection: 'column' }}>
    <div style={{ fontSize: 48, fontWeight: 800 }}>404</div>
    <div style={{ fontSize: 18, marginTop: 8, color: 'var(--text-secondary)' }}>Page not found</div>
    <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: 16 }}>Go home</Link>
  </div>
);

export default NotFound;
