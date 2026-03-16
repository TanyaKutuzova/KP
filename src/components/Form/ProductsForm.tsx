import React from 'react';
import clsx from 'clsx';
import { useProposal } from '../../context/ProposalContext';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

const money = (n: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(
    Number.isFinite(n) ? n : 0,
  );

export const ProductsForm: React.FC = () => {
  const { state, validation, dispatch, total } = useProposal();

  return (
    <div
      className={clsx(
        'animate-fadeIn rounded-2xl border bg-slate-900/60 p-4 shadow-lg',
        validation.products ? 'border-slate-800' : 'border-red-500/60',
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
            🛒
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            Товары / услуги
          </h3>
        </div>
        <Button type="button" onClick={() => dispatch({ type: 'ADD_PRODUCT' })}>
          Добавить позицию
        </Button>
      </div>

      {state.products.length === 0 ? (
        <p className="text-xs text-slate-400">Добавьте хотя бы одну позицию.</p>
      ) : (
        <div className="space-y-3">
          {state.products.map((p) => {
            const lineTotal = p.quantity * p.price;
            return (
              <div
                key={p.id}
                className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 transition-all"
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                  <div className="md:col-span-5">
                    <Input
                      label="Наименование"
                      placeholder="Услуга / товар"
                      value={p.name}
                      onChange={(e) =>
                        dispatch({
                          type: 'UPDATE_PRODUCT',
                          id: p.id,
                          field: 'name',
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label="Кол-во"
                      type="number"
                      min={1}
                      value={String(p.quantity)}
                      onChange={(e) =>
                        dispatch({
                          type: 'UPDATE_PRODUCT',
                          id: p.id,
                          field: 'quantity',
                          value: Math.max(1, Number(e.target.value)),
                        })
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label="Цена за ед."
                      type="number"
                      min={0}
                      value={String(p.price)}
                      onChange={(e) =>
                        dispatch({
                          type: 'UPDATE_PRODUCT',
                          id: p.id,
                          field: 'price',
                          value: Math.max(0, Number(e.target.value)),
                        })
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input label="Стоимость" value={money(lineTotal)} readOnly />
                  </div>
                  <div className="flex items-end md:col-span-1">
                    <button
                      type="button"
                      className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/40 text-sm text-slate-300 transition-all hover:border-red-500/60 hover:text-red-300"
                      onClick={() => dispatch({ type: 'REMOVE_PRODUCT', id: p.id })}
                      title="Удалить"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
            <span className="text-xs font-medium text-slate-300">Итого</span>
            <span className="text-sm font-semibold text-slate-50">{money(total)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

