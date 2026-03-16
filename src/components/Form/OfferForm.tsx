import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Input } from '../UI/Input';
import clsx from 'clsx';

export const OfferForm: React.FC = () => {
  const { state, validation, dispatch } = useProposal();

  return (
    <div className="animate-fadeIn rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/15 text-sky-300">
          📄
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          Суть предложения
        </h3>
      </div>
      <div className="space-y-3">
        <Input
          label="Заголовок УТП"
          placeholder="Увеличьте продажи на 30% за 2 месяца"
          value={state.utpTitle}
          error={!validation.utpTitle}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'utpTitle', value: e.target.value })}
        />
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-300">
          <span>Описание проблемы</span>
          <textarea
            rows={3}
            className={clsx(
              'rounded-xl border bg-slate-900/60 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none transition-all placeholder:text-slate-500',
              'border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40',
            )}
            placeholder="Опишите боль клиента..."
            value={state.problemDesc}
            onChange={(e) =>
              dispatch({ type: 'SET_FIELD', field: 'problemDesc', value: e.target.value })
            }
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-300">
          <span>Описание решения</span>
          <textarea
            rows={3}
            className={clsx(
              'rounded-xl border bg-slate-900/60 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none transition-all placeholder:text-slate-500',
              'border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40',
            )}
            placeholder="Опишите, как вы решаете проблему..."
            value={state.solutionDesc}
            onChange={(e) =>
              dispatch({ type: 'SET_FIELD', field: 'solutionDesc', value: e.target.value })
            }
          />
        </label>
      </div>
    </div>
  );
};

