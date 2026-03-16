import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { ProposalData, ProposalValidation, Product, ColorScheme } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ProposalAction =
  | { type: 'SET_FIELD'; field: keyof ProposalData; value: ProposalData[keyof ProposalData] }
  | { type: 'ADD_PRODUCT' }
  | { type: 'UPDATE_PRODUCT'; id: string; field: keyof Product; value: Product[keyof Product] }
  | { type: 'REMOVE_PRODUCT'; id: string }
  | { type: 'RESET'; payload: ProposalData };

interface ProposalContextValue {
  state: ProposalData;
  validation: ProposalValidation;
  dispatch: React.Dispatch<ProposalAction>;
  reset: () => void;
  total: number;
}

const ProposalContext = createContext<ProposalContextValue | undefined>(undefined);

const defaultData: ProposalData = {
  logo: null,
  companyName: '',
  phone: '',
  email: '',
  website: '',
  clientCompany: '',
  clientContact: '',
  utpTitle: '',
  problemDesc: '',
  solutionDesc: '',
  products: [],
  expiryDate: '',
  paymentTerms: 'Предоплата 100%',
  executionDays: 14,
  showPartners: false,
  showReview: false,
  reviewText: '',
  colorScheme: 'blue',
};

function reducer(state: ProposalData, action: ProposalAction): ProposalData {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value } as ProposalData;
    case 'ADD_PRODUCT': {
      const newProduct: Product = {
        id: crypto.randomUUID(),
        name: '',
        quantity: 1,
        price: 0,
      };
      return { ...state, products: [...state.products, newProduct] };
    }
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.id ? { ...p, [action.field]: action.value } : p,
        ),
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.id),
      };
    case 'RESET':
      return action.payload;
    default:
      return state;
  }
}

export const ProposalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persisted, setPersisted] = useLocalStorage<ProposalData>('proposal-data', defaultData);
  const [state, dispatchBase] = useReducer(reducer, persisted);

  useEffect(() => {
    setPersisted(state);
  }, [setPersisted, state]);

  const dispatch: React.Dispatch<ProposalAction> = dispatchBase;

  const reset = () => {
    setPersisted(defaultData);
    dispatchBase({ type: 'RESET', payload: defaultData });
  };

  const validation: ProposalValidation = useMemo(
    () => ({
      companyName: state.companyName.trim().length > 0,
      utpTitle: state.utpTitle.trim().length > 0,
      products: state.products.length > 0,
    }),
    [state.companyName, state.utpTitle, state.products.length],
  );

  const total = useMemo(
    () => state.products.reduce((acc, p) => acc + p.quantity * p.price, 0),
    [state.products],
  );

  const value: ProposalContextValue = {
    state,
    validation,
    dispatch,
    reset,
    total,
  };

  return <ProposalContext.Provider value={value}>{children}</ProposalContext.Provider>;
};

export function useProposal() {
  const ctx = useContext(ProposalContext);
  if (!ctx) {
    throw new Error('useProposal must be used within ProposalProvider');
  }
  return ctx;
}

export function useColorSchemeTokens(scheme: ColorScheme) {
  switch (scheme) {
    case 'green':
      return {
        primary: '#059669',
        primaryLight: '#6ee7b7',
        textOnPrimary: '#ffffff',
        border: '#d1fae5',
        mutedRow: '#ecfdf5',
      };
    case 'orange':
      return {
        primary: '#ea580c',
        primaryLight: '#fed7aa',
        textOnPrimary: '#0f172a',
        border: '#fed7aa',
        mutedRow: '#fff7ed',
      };
    case 'blue':
    default:
      return {
        primary: '#2563eb',
        primaryLight: '#bfdbfe',
        textOnPrimary: '#ffffff',
        border: '#dbeafe',
        mutedRow: '#eff6ff',
      };
  }
}

