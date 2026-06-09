import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const MobileSidebar: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 800 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
      <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} transition={{ duration: 0.18 }} style={{ width: 280, background: 'var(--bg-sidebar)', height: '100%', padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-icon" onClick={onClose}><X size={14} /></button>
        </div>
        {children}
      </motion.aside>
    </div>
  );
};

export default MobileSidebar;
