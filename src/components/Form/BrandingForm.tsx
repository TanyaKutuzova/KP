import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Input } from '../UI/Input';
import { DragDropLogo } from '../UI/DragDropLogo';

export const BrandingForm: React.FC = () => {
  const { state, validation, dispatch } = useProposal();

  return (
    <div className="animate-fadeIn rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
          🖌
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          Брендирование
        </h3>
      </div>
      <div className="space-y-3">
        <DragDropLogo
          value={state.logo}
          onChange={(val) => dispatch({ type: 'SET_FIELD', field: 'logo', value: val })}
        />
        <Input
          label="Название компании"
          placeholder="ООО Ваша Компания"
          value={state.companyName}
          error={!validation.companyName}
          onChange={(e) =>
            dispatch({ type: 'SET_FIELD', field: 'companyName', value: e.target.value })
          }
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Input
            label="Телефон"
            placeholder="+7 (999) 123-45-67"
            value={state.phone}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'phone', value: e.target.value })}
          />
          <Input
            label="Email"
            placeholder="sales@company.ru"
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
          />
          <Input
            label="Сайт"
            placeholder="https://company.ru"
            value={state.website}
            onChange={(e) =>
              dispatch({ type: 'SET_FIELD', field: 'website', value: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

