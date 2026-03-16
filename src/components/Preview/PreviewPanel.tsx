import React, { useMemo } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useProposal } from '../../context/ProposalContext';
import { PDFDocument } from './PDFDocument';
import { Button } from '../UI/Button';

export const PreviewPanel: React.FC = () => {
  const { state, total } = useProposal();

  const doc = useMemo(() => <PDFDocument data={state} total={total} />, [state, total]);

  return (
    <div className="flex h-[calc(100vh-7.25rem)] flex-col rounded-2xl border border-slate-800 bg-slate-950/70 shadow-xl backdrop-blur md:h-full">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">PDF Preview</h2>
          <p className="text-xs text-slate-400">Генерация на клиенте, без сервера</p>
        </div>
        <PDFDownloadLink document={doc} fileName="commercial-proposal.pdf">
          {({ loading }) => (
            <Button type="button" disabled={loading}>
              {loading ? 'Готовим PDF…' : 'Скачать PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>

      <div className="flex-1 overflow-hidden rounded-b-2xl bg-slate-900/40">
        <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={false}>
          {doc}
        </PDFViewer>
      </div>
    </div>
  );
};

