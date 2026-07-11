import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout: React.FC = () => {
  const [open, setOpen] = useState(window.innerWidth > 768);
  return (
    <div className="d-flex">
      <Sidebar isOpen={open} onToggle={() => setOpen(!open)} />
      <div className="main-content flex-grow-1">
        <Header onToggleSidebar={() => setOpen(!open)} />
        <main className="p-4"><Outlet /></main>
      </div>
    </div>
  );
};
