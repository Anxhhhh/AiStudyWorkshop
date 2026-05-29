import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Tasks from './pages/Tasks';
import AI from './pages/AI';
import Login from './pages/Login';
import Signup from './pages/Signup';

/* ─── Page metadata ─── */
const pageLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  notes: 'Notes',
  tasks: 'Tasks',
  ai: 'AI Assistant',
  shared: 'Shared Workspace',
  goals: 'Goals',
  meetings: 'Meeting Notes',
  profile: 'Profile',
};

const routeToPage: Record<string, string> = {
  '/dashboard': 'dashboard',
  '/notes': 'notes',
  '/tasks': 'tasks',
  '/ai': 'ai',
  '/shared': 'shared',
  '/goals': 'goals',
  '/meetings': 'meetings',
  '/profile': 'profile',
};

/* ─── App Shell with routing aware sidebar ─── */
const AppShell: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePage = routeToPage[location.pathname] ?? 'dashboard';
  const pageLabel = pageLabels[activePage] ?? 'Dashboard';

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <Layout
      activePage={activePage}
      pageLabel={pageLabel}
      onNavigate={handleNavigate}
    >
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/ai" element={<AI />} />
        {/* Placeholder pages */}
        <Route path="/shared" element={<PlaceholderPage title="Shared Workspace" desc="Collaborate with your team in real time." />} />
        <Route path="/goals" element={<PlaceholderPage title="Goals" desc="Track your learning goals and milestones." />} />
        <Route path="/meetings" element={<PlaceholderPage title="Meeting Notes" desc="Capture and organize all your meeting notes." />} />
        <Route path="/profile" element={<PlaceholderPage title="Profile" desc="Manage your account and preferences." />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
};

/* ─── Placeholder for future pages ─── */
const PlaceholderPage: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div style={{ maxWidth: 600 }}>
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{desc}</p>
    </div>
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px dashed var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: '60px 40px',
        textAlign: 'center',
        color: 'var(--text-tertiary)',
        fontSize: 14,
      }}
    >
      🚧 This page is coming soon
    </div>
  </div>
);



/* ─── Root App ─── */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages — no layout */}
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignupWrapper />} />
        {/* App pages — with layout */}
        <Route path="/*" element={<AppShell />} />
      </Routes>
    </BrowserRouter>
  );
};

/* Small wrappers to inject navigation handler */
const LoginWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <Login onNavigate={(p) => navigate(`/${p}`)} />;
};

const SignupWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <Signup onNavigate={(p) => navigate(`/${p}`)} />;
};

export default App;
