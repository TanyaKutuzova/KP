import React from 'react';
import {
  AdditionalForm,
  BrandingForm,
  ClientForm,
  ColorScheme,
  OfferForm,
  ProductsForm,
} from '../Form';
import { PreviewPanel } from '../Preview';
import { useProposal } from '../../context/ProposalContext';
import { Button } from '../UI/Button';

export const MainLayout: React.FC = () => {
  const { reset } = useProposal();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <h1 className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-lg font-semibold text-transparent">
              Генератор коммерческих предложений
            </h1>
            <p className="text-xs text-slate-400">
              Настройте форму слева и получите PDF-превью справа в реальном времени.
            </p>
          </div>
          <Button variant="ghost" type="button" onClick={reset}>
            Сбросить все
          </Button>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 md:flex-row">
        <section className="md:w-2/5">
          <div className="flex h-full flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">Настройки предложения</h2>
              <ColorScheme />
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
              <BrandingForm />
              <ClientForm />
              <OfferForm />
              <ProductsForm />
              <AdditionalForm />
            </div>
          </div>
        </section>
        <section className="mt-4 md:mt-0 md:w-3/5">
          <PreviewPanel />
        </section>
      </main>
    </div>
  );
};

import React from 'react';
import { BrandingForm } from '../Form/BrandingForm';
import { ClientForm } from '../Form/ClientForm';
import { OfferForm } from '../Form/OfferForm';
import { ProductsForm } from '../Form/ProductsForm';
import { AdditionalForm } from '../Form/AdditionalForm';
import { ColorScheme } from '../Form/ColorScheme';
import { PreviewPanel } from '../Preview/PreviewPanel';
import { useProposal } from '../../context/ProposalContext';
import { Button } from '../UI/Button';

export const MainLayout: React.FC = () => {
  const { reset } = useProposal();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <h1 className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-lg font-semibold text-transparent">
              Генератор коммерческих предложений
            </h1>
            <p className="text-xs text-slate-400">
              Настройте форму слева и получите PDF-превью справа в реальном времени.
            </p>
          </div>
          <Button variant="ghost" type="button" onClick={reset}>
            Сбросить все
          </Button>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 md:flex-row">
        <section className="md:w-2/5">
          <div className="flex h-full flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">Настройки предложения</h2>
              <ColorScheme />
            </div>
            <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto pr-1">
              <BrandingForm />
              <ClientForm />
              <OfferForm />
              <ProductsForm />
              <AdditionalForm />
            </div>
          </div>
        </section>
        <section className="mt-4 md:mt-0 md:w-3/5">
          <PreviewPanel />
        </section>
      </main>
    </div>
  );
};

