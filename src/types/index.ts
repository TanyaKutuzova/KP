export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export type ColorScheme = 'blue' | 'green' | 'orange';

export interface ProposalData {
  logo: string | null;
  companyName: string;
  phone: string;
  email: string;
  website: string;
  clientCompany: string;
  clientContact: string;
  utpTitle: string;
  problemDesc: string;
  solutionDesc: string;
  products: Product[];
  expiryDate: string;
  paymentTerms: string;
  executionDays: number;
  showPartners: boolean;
  showReview: boolean;
  reviewText: string;
  colorScheme: ColorScheme;
}

export interface ProposalValidation {
  companyName: boolean;
  utpTitle: boolean;
  products: boolean;
}

