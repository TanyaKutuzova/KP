import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...rest }) => {
  return (
    <label className="inline-flex items-center gap-2 text-xs text-slate-300">
      <input
        type="checkbox"
        className={`h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-500 focus:ring-indigo-500 ${className ?? ''}`}
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
};

