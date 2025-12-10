export interface CreateCustomerRequest {
  fullName: string;
  email: string;
  nationalId: string;
}

export interface CustomerResponse {
  id: number;
  fullName: string;
  email: string;
  nationalId: string;
}
