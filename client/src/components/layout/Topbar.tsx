import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Share2,
  Bell,
  MoreHorizontal,
  ChevronRight,
  Lock,
} from 'lucide-react';

interface TopbarProps {
  pageLabel: string;
}

const Topbar: React.FC<TopbarProps> = ({ pageLabel }) => {
  const breadcrumb = ['AI Study Workspace', pageLabel];

  return (
    <header className="topbar">
      {/* Left: Breadcrumb */}
      <div className="topbar-left">
        <div className="topbar-breadcrumb">
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={crumb}>
              {i > 0 && (
                <ChevronRight
                  size={12}
                  className="breadcrumb-sep"
                  color="var(--text-disabled)"
                />
              )}
              <span className={`breadcrumb-item ${i === breadcrumb.length - 1 ? 'active' : ''}`}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="topbar-right">
        {/* Privacy */}
        <button
          id="privacy-toggle"
          className="btn-ghost btn"
          style={{ padding: '5px 10px', fontSize: 12, gap: 5 }}
        >
          <Lock size={12} />
          Private
        </button>

        <div className="topbar-divider" />

        <span className="topbar-meta">Edited just now</span>

        <div className="topbar-divider" />

        {/* Icon buttons */}
        <motion.button
          id="search-btn"
          className="btn-icon"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Search"
        >
          <Search size={15} />
        </motion.button>

        <motion.button
          id="notifications-btn"
          className="btn-icon"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Notifications"
        >
          <Bell size={15} />
        </motion.button>

        <div className="topbar-divider" />

        <motion.button
          id="share-btn"
          className="btn-ghost btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Share2 size={13} />
          Share
        </motion.button>

        <motion.button
          id="more-btn"
          className="btn-icon"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MoreHorizontal size={15} />
        </motion.button>

        {/* User Avatar */}
        <div
          className="user-avatar"
          style={{ width: 30, height: 30, fontSize: 12, cursor: 'pointer' }}
          title="Ansh Raj"
        >
          A
        </div>
      </div>
    </header>
  );
};

export default Topbar;
