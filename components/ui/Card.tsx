import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actions?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void; // Added onClick prop
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, actions, onClick }) => {
  return (
    <div 
      className={`bg-white shadow-lg rounded-xl p-6 ${className}`}
      onClick={onClick} // Applied onClick prop
    >
      {(title || actions) && (
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-DEFAULT">
          {title && <h3 className="text-xl font-semibold text-neutral-darker">{title}</h3>}
          {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
