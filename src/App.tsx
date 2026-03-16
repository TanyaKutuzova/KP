import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProposalProvider } from './context/ProposalContext';
import { MainLayout } from './components/Layout/MainLayout';

const App: React.FC = () => {
  return (
    <ProposalProvider>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProposalProvider>
  );
};

export default App;

