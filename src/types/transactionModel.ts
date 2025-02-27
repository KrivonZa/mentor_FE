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
