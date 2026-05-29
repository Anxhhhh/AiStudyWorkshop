import React, { useRef } from 'react';
import {
  Home,
  FileText,
  CheckSquare,
  Brain,
  Users,
  Target,
  MessageSquare,
  UserCircle,
  Sparkles,
  Clock,
  BookOpen,
  Zap,
  ChevronDown,
  Settings,
  Plus,
} from 'lucide-react';

interface NavItemDef {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const mainNav: NavItemDef[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: 4 },
  { id: 'ai', label: 'AI Assistant', icon: Brain },
  { id: 'shared', label: 'Shared Workspace', icon: Users },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'meetings', label: 'Meeting Notes', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: UserCircle },
];

const recents: NavItemDef[] = [
  { id: 'r-1', label: 'Data Structures Notes', icon: BookOpen },
  { id: 'r-2', label: 'Sprint Planning', icon: Clock },
  { id: 'r-3', label: 'Algorithm Study Plan', icon: Brain },
];

const aiTools: NavItemDef[] = [
  { id: 'ai-summarize', label: 'Summarize Notes', icon: Sparkles },
  { id: 'ai-quiz', label: 'Generate Quiz', icon: Zap },
];

interface SidebarProps {
  activePage: string;
  onNavigate?: (page: string) => void;
  isOpen?: boolean;
}

import { useNavigate } from 'react-router-dom';

const NavItem: React.FC<{
  item: NavItemDef;
  active: boolean;
}> = ({ item, active }) => {
  const Icon = item.icon;
  const navigate = useNavigate();

  return (
    <button
      className={`nav-item ${active ? 'active' : ''}`}
      onClick={() => navigate(`/${item.id}`)}
    >
      <Icon className="nav-icon" size={15} />
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.badge !== undefined && (
        <span className="nav-badge">{item.badge}</span>
      )}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activePage, isOpen = true }) => {
  // Track if we've already played the entrance animation so it doesn't
  // re-run (and block clicks) every time activePage prop changes.
  const hasMounted = useRef(false);
  const initial = hasMounted.current ? false : { x: -16, opacity: 0 };
  if (!hasMounted.current) hasMounted.current = true;

  return (
    <aside
      className={`sidebar ${isOpen ? '' : 'closed'}`}
      style={{
        animation: initial ? 'sidebarFadeIn 0.25s ease-out forwards' : 'none',
      }}
    >
      {/* Workspace Header */}
      <div className="sidebar-header">
        <div className="workspace-logo">A</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="workspace-name">Ansh's Workspace</div>
          <div className="workspace-plan">Free plan</div>
        </div>
        <button className="btn-icon" style={{ width: 24, height: 24 }}>
          <ChevronDown size={14} color="var(--text-tertiary)" />
        </button>
      </div>

      <div className="sidebar-divider" />

      {/* Main Navigation */}
      <div className="sidebar-section">
        <nav className="sidebar-nav">
          {mainNav.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={activePage === item.id}
            />
          ))}
        </nav>
      </div>

      <div className="sidebar-divider" />

      {/* Recents */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">Recents</div>
        <nav className="sidebar-nav">
          {recents.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={false}
            />
          ))}
        </nav>
      </div>

      <div className="sidebar-divider" />

      {/* AI Tools */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">AI Tools</div>
        <nav className="sidebar-nav">
          {aiTools.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={false}
            />
          ))}
        </nav>
      </div>

      <div className="sidebar-divider" />

      {/* Teamspaces */}
      <div className="sidebar-section">
        <div
          className="sidebar-section-label"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>Teamspaces</span>
          <button className="btn-icon" style={{ width: 20, height: 20 }}>
            <Plus size={12} color="var(--text-tertiary)" />
          </button>
        </div>
        <div
          style={{
            padding: '6px 10px',
            borderRadius: 'var(--radius-md)',
            fontSize: 12,
            color: 'var(--text-tertiary)',
          }}
        >
          No teamspaces yet
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">A</div>
          <div className="user-info">
            <div className="user-name">Ansh Raj</div>
            <div className="user-email">ansh@workspace.dev</div>
          </div>
          <button className="btn-icon" style={{ width: 24, height: 24 }}>
            <Settings size={13} color="var(--text-tertiary)" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
