import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Input } from '../UI/Input';

export const ClientForm: React.FC = () => {
  const { state, dispatch } = useProposal();

  return (
    <div className="animate-fadeIn rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
          👤
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Клиент</h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Input
          label="Компания клиента"
          placeholder="ООО Клиент"
          value={state.clientCompany}
          onChange={(e) =>
            dispatch({ type: 'SET_FIELD', field: 'clientCompany', value: e.target.value })
          }
        />
        <Input
          label="Контактное лицо"
          placeholder="Иван Иванов"
          value={state.clientContact}
          onChange={(e) =>
            dispatch({ type: 'SET_FIELD', field: 'clientContact', value: e.target.value })
          }
        />
      </div>
    </div>
  );
};

