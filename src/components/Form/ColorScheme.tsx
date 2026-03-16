import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { ColorScheme as ColorSchemeType } from '../../types';
import clsx from 'clsx';

const presets: Array<{ id: ColorSchemeType; primary: string; secondary: string }> = [
  { id: 'blue', primary: '#2563eb', secondary: '#94a3b8' },
  { id: 'green', primary: '#059669', secondary: '#ffffff' },
  { id: 'orange', primary: '#ea580c', secondary: '#0f172a' },
];

export const ColorScheme: React.FC = () => {
  const { state, dispatch } = useProposal();

  return (
    <div className="flex items-center gap-2">
      {presets.map((p) => {
        const active = state.colorScheme === p.id;
        return (
          <button
            key={p.id}
            type="button"
            className={clsx(
              'h-6 w-6 rounded-full border transition-all',
              active ? 'border-slate-200 shadow-lg' : 'border-slate-700 hover:border-slate-400',
            )}
            style={{
              background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`,
            }}
            onClick={() =>
              dispatch({ type: 'SET_FIELD', field: 'colorScheme', value: p.id as ColorSchemeType })
            }
            title={`Схема: ${p.id}`}
          />
        );
      })}
    </div>
  );
};

