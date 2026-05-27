import React from 'react';
import Icon from './Icon';

const Topbar: React.FC = () => {
  return (
    <header className="topbar h-14 flex justify-between items-center px-6 sticky top-0 z-40">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2 text-on-surface-variant text-xs">
        <Icon name="search" className="text-lg text-primary" />
        <span className="text-on-surface font-semibold">Projects</span>
        <span className="text-on-surface-variant">|</span>
        <span>By Status</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-on-surface-variant">
          <button
            id="privacy-toggle"
            className="hover:text-on-surface transition-colors flex items-center gap-1 text-xs"
          >
            <Icon name="lock" className="text-sm" />
            Private
          </button>
        </div>

        <div className="h-4 w-px bg-white/10" />

        <span className="text-xs text-on-surface-variant">Edited Oct 26, 2025</span>

        <div className="flex items-center gap-2">
          <button
            id="share-btn"
            className="btn-ghost flex items-center gap-1 px-3 py-1.5 rounded-md text-xs"
          >
            <Icon name="share" className="text-sm" />
            Share
          </button>

          <button
            id="new-btn"
            className="btn-primary flex items-center gap-1 px-3 py-1.5 rounded-md text-xs"
          >
            New
            <Icon name="expand_more" className="text-sm" />
          </button>

          <button id="more-btn" className="icon-btn">
            <Icon name="more_horiz" className="text-sm" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
