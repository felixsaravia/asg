import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'green' | 'yellow' | 'red';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string; // Added className prop
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  color = 'primary',
  size = 'md',
  showValue = true,
  className = '', // Default to empty string
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}> {/* Applied className prop */}
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-neutral-dark">{label}</span>
          {showValue && <span className="text-sm font-medium text-neutral-dark">{clampedValue}%</span>}
        </div>
      )}
      <div className={`w-full bg-neutral-DEFAULT rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        ></div>
      </div>
    </div>
  );
};
