export type AccountType = 'CHECKING' | 'SAVINGS';

export interface CreateAccountRequest {
  customerId: number;
  type: AccountType;
  initialBalance: number;
}

export interface AccountResponse {
  id: number;
  customerId: number;
  type: AccountType;
  balance: number;
  currency: string;
}
