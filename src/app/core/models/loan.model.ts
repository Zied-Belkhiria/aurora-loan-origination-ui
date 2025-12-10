export type LoanStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface CreateLoanRequest {
  customerId: number;
  amount: number;
  termMonths: number;
  annualRate: number;
}

export interface LoanResponse {
  id: number;
  customerId: number;
  amount: number;
  termMonths: number;
  annualRate: number;
  status: LoanStatus;
  riskScore: number | null;
  monthlyInstallment: number | null;
  createdAt: string;
}
