
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItemDefinition } from '../../types';
import { Button } from '../ui/Button';

interface AppShellProps {
  children: React.ReactNode;
  navItems: NavItemDefinition[];
  pageTitle: string;
  onCrisisModeClick: () => void;
}

const MenuIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const BellIcon = (props: { className?: string; [key: string]: any; }) => ( // Crisis Icon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const GiftIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1012 9.375a2.625 2.625 0 000-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.375L12 21m0-11.625L8.25 12.75M12 9.375L15.75 12.75M3.75 11.25h16.5" />
  </svg>
);


export const AppShell: React.FC<AppShellProps> = ({ children, navItems, pageTitle, onCrisisModeClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-neutral-light overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary-dark text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 h-16 border-b border-primary">
          <Link to="/" className="text-2xl font-bold text-white hover:text-secondary-light transition-colors">
            Presente<span className="text-secondary-light">Seguro</span>
          </Link>
          <button onClick={toggleSidebar} className="md:hidden text-white hover:text-secondary-light">
            <CloseIcon />
          </button>
        </div>
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard');
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-150 ease-in-out
                            ${isActive 
                              ? 'bg-secondary text-primary-dark font-medium shadow-inner' 
                              : 'text-neutral-light hover:bg-primary hover:text-white'
                            }`}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-primary-dark' : 'text-secondary-light'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Donation Button Section */}
        <div className="p-4">
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=EVVDT5T489GUQ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apoya el proyecto con una donación en PayPal"
            className={`font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out inline-flex items-center justify-center w-full
                        bg-secondary text-primary-dark hover:bg-secondary-dark focus:ring-secondary 
                        px-4 py-2 text-base`} // Styles from Button component (variant secondary, size md)
          >
            <GiftIcon className="w-5 h-5 mr-2"/>
            Apoya el Proyecto
          </a>
        </div>
        
        <div className="p-4 border-t border-primary">
            <Button 
                variant="danger" 
                onClick={() => {
                    onCrisisModeClick();
                    if(isSidebarOpen) setIsSidebarOpen(false);
                }}
                className="w-full"
                leftIcon={<BellIcon className="w-5 h-5"/>}
            >
                Modo Crisis
            </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 md:justify-end">
          <button onClick={toggleSidebar} className="md:hidden text-neutral-darker hover:text-primary">
            <MenuIcon />
          </button>
          <h1 className="text-xl font-semibold text-neutral-darker md:absolute md:left-1/2 md:-translate-x-1/2">{pageTitle}</h1>
          <div className="flex items-center space-x-4">
            {/* Placeholder for user profile or settings */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto bg-neutral-light">
          {children}
        </main>
      </div>
    </div>
  );
};
