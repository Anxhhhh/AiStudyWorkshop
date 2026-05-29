import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  pageLabel: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, pageLabel, onNavigate }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect fires synchronously before paint — guarantees scroll is
  // at 0 before the browser renders the new page content.
  useLayoutEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.scrollTop = 0;
    }
  }, [activePage]);

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isOpen={true}
      />

      <main className="main-content">
        <Topbar pageLabel={pageLabel} />

        {/* page-canvas is the ONLY scrollable container */}
        <div className="page-canvas" ref={canvasRef}>
          {/*
            No AnimatePresence — when `key` changes React immediately
            unmounts the old page and mounts the new one at scroll-top.
            We only animate the entrance (fade-in) with no exit animation,
            so there is never a moment where two pages stack in the DOM.
          */}
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: [0, 0, 0.2, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
