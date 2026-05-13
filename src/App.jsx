import { useState, useEffect } from 'react';
import { PokemonProvider } from './context/PokemonContext';
import TopNav from './components/layout/TopNav';
import ControlSidebar from './components/layout/ControlSidebar';
import MainContent from './components/layout/MainContent';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(true);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggle = () => setSidebarOpen(s => !s);
  const close = () => setSidebarOpen(false);

  return (
    <PokemonProvider>
      <div className="flex flex-col h-screen" style={{ background: 'var(--background)' }}>
        <TopNav onToggleSidebar={toggle} />
        <div className="flex flex-1 overflow-hidden relative">
          <ControlSidebar open={sidebarOpen} onToggle={toggle} onClose={close} />
          <MainContent />
        </div>
      </div>
    </PokemonProvider>
  );
}
