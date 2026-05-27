import React, { useState } from 'react';
import Icon from './Icon';

interface ViewTab {
  id: string;
  label: string;
  icon: string;
}

const viewTabs: ViewTab[] = [
  { id: 'by-status', label: 'By Status', icon: 'view_column' },
  { id: 'all', label: 'All Projects', icon: 'star' },
  { id: 'gantt', label: 'Gantt', icon: 'waterfall_chart' },
];

const ViewTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('by-status');

  return (
    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-2">
      {/* Tab Buttons */}
      <div className="flex gap-1">
        {viewTabs.map((tab) => (
          <button
            key={tab.id}
            id={`view-tab-${tab.id}`}
            className={`view-tab ${
              activeTab === tab.id ? 'view-tab--active' : 'view-tab--inactive'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon name={tab.icon} className="text-sm" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter/Sort/Search Icons */}
      <div className="flex items-center gap-1 text-on-surface-variant">
        <button id="filter-btn" className="icon-btn">
          <Icon name="filter_list" className="text-sm" />
        </button>
        <button id="sort-btn" className="icon-btn">
          <Icon name="sort" className="text-sm" />
        </button>
        <button id="search-btn" className="icon-btn">
          <Icon name="search" className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default ViewTabs;
