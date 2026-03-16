import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Checkbox } from '../UI/Checkbox';
import { Input } from '../UI/Input';

export const AdditionalForm: React.FC = () => {
  const { state, dispatch } = useProposal();

  return (
    <div className="animate-fadeIn rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
          ⚙️
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          Дополнительно
        </h3>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Input
            label="Срок действия предложения"
            type="date"
            value={state.expiryDate}
            onChange={(e) =>
              dispatch({ type: 'SET_FIELD', field: 'expiryDate', value: e.target.value })
            }
          />
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-300">
            <span>Условия оплаты</span>
            <select
              className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40"
              value={state.paymentTerms}
              onChange={(e) =>
                dispatch({ type: 'SET_FIELD', field: 'paymentTerms', value: e.target.value })
              }
            >
              <option>Предоплата 100%</option>
              <option>Постоплата</option>
              <option>Частичная</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Input
            label="Срок выполнения (дней)"
            type="number"
            min={1}
            value={String(state.executionDays)}
            onChange={(e) =>
              dispatch({
                type: 'SET_FIELD',
                field: 'executionDays',
                value: Math.max(1, Number(e.target.value)),
              })
            }
          />
          <div className="flex items-end">
            <div className="flex flex-col gap-2">
              <Checkbox
                label="Показать логотипы партнеров"
                checked={state.showPartners}
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'showPartners', value: e.target.checked })
                }
              />
              <Checkbox
                label="Добавить отзыв клиента"
                checked={state.showReview}
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'showReview', value: e.target.checked })
                }
              />
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40 transition-all ${
            state.showReview ? 'max-h-64 p-3 opacity-100' : 'max-h-0 p-0 opacity-0'
          }`}
        >
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-300">
            <span>Текст отзыва</span>
            <textarea
              rows={3}
              className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none transition-all placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40"
              placeholder="Например: “Команда выполнила проект в срок, продажи выросли...”"
              value={state.reviewText}
              onChange={(e) =>
                dispatch({ type: 'SET_FIELD', field: 'reviewText', value: e.target.value })
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
};

