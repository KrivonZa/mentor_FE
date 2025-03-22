export interface DepositRequest {
  amount: number;
  paymentMethod: string;
}

export interface WithdrawRequest {
  accountNumber: string;
  amount: number;
  bankName: string;
  accountHolderName: string;
}

export interface coursePayment {
  courseId: number;
  paymentMethod: string;
}

export interface transactionHistory {
  from: string;
  to: string;
  paymentMethod: string;
  type: string;
  status: string;
}

export type WithdrawStatus = 'PENDING' | 'DONE' | 'REJECTED';

export interface WithdrawFilter {
  email?: string;
  name?: string;
  phone?: string;
  statuses?: WithdrawStatus[];
  sortField?: string;
}

export interface WithdrawItem {
  id?: string;
  accountNumber: string;
  bankName: string;
  accountHolderName: string;
  status: WithdrawStatus;
  createdAt: number[];
  amount: number;
  creatorEmail: string;
  creatorName: string;
}
