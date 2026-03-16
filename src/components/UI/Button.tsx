import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...rest }) => {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-60 disabled:cursor-not-allowed';
  const variants: Record<typeof variant, string> = {
    primary:
      'bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 text-white shadow-lg hover:shadow-xl hover:brightness-110',
    ghost:
      'border border-slate-700 text-slate-100 hover:bg-slate-800/70 hover:border-slate-500',
  };

  return <button className={clsx(base, variants[variant], className)} {...rest} />;
};

