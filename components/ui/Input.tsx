
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Input: React.FC<InputProps> = ({ label, name, error, className = '', wrapperClassName = '', ...props }) => {
  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-neutral-dark mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={`w-full px-3 py-2 border border-neutral-DEFAULT rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-neutral-darker placeholder-neutral-dark/50 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, name, error, className = '', wrapperClassName = '', ...props }) => {
  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-neutral-dark mb-1">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        rows={4}
        className={`w-full px-3 py-2 border border-neutral-DEFAULT rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-neutral-darker placeholder-neutral-dark/50 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
    