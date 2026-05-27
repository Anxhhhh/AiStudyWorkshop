import React, { useState } from 'react';
import Icon from './Icon';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'notes', label: 'Notes', icon: 'description' },
  { id: 'tasks', label: 'Tasks', icon: 'task_alt' },
  { id: 'ai-assistant', label: 'AI Assistant', icon: 'smart_toy' },
  { id: 'shared', label: 'Shared Workspace', icon: 'group' },
  { id: 'goals', label: 'Goals', icon: 'target' },
  { id: 'meetings', label: 'Meeting Notes', icon: 'event_note' },
];

const Sidebar: React.FC = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <aside className="sidebar w-[260px] h-screen fixed left-0 top-0 overflow-y-auto flex flex-col z-50">
      {/* Brand Header */}
      <div className="p-4 flex items-center gap-3 mt-2">
        <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
          A
        </div>
        <div className="flex flex-col">
          <span className="text-on-surface font-semibold text-sm truncate w-40">
            Ansh Raj's Workspace
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-2 flex flex-col gap-6">
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`nav-item ${
                activeNav === item.id ? 'nav-item--active' : 'nav-item--inactive'
              }`}
              onClick={() => setActiveNav(item.id)}
            >
              <Icon name={item.icon} className="text-lg" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Footer - Invite */}
      <div className="p-3 border-t border-white/5">
        <button className="invite-btn" id="invite-members-btn">
          <Icon name="person_add" className="text-lg text-on-surface-variant" />
          <div className="flex flex-col items-start">
            <span className="font-semibold text-on-surface text-xs">Invite members</span>
            <span className="text-[10px] text-on-surface-variant">
              Collaborate with your team.
            </span>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
