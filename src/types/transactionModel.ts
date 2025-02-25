export interface DepositRequest {
  amount: number;
  paymentMethod: string;
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
