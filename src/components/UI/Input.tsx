import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...rest }) => {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-slate-300">
      <span>{label}</span>
      <input
        className={clsx(
          'rounded-xl border bg-slate-900/60 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none transition-all placeholder:text-slate-500',
          error
            ? 'border-red-500/80 focus:border-red-400 focus:ring-2 focus:ring-red-500/40'
            : 'border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40',
          className,
        )}
        {...rest}
      />
    </label>
  );
};

