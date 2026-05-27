import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ViewTabs from '../components/ViewTabs';
import KanbanBoard from '../components/KanbanBoard';
import Icon from '../components/Icon';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-[260px] flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Canvas */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-8">
          <div className="max-w-[1200px]">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-on-surface flex items-center gap-3 mb-2">
                <Icon name="search" className="text-4xl text-primary" />
                Projects
              </h1>
              <p className="text-on-surface-variant text-base">
                Manage and execute projects from start to finish.
              </p>
            </div>

            {/* View Tabs */}
            <ViewTabs />

            {/* Kanban Board */}
            <KanbanBoard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
