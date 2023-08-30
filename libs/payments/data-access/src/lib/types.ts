export type Payment = {
  id: string;
  status: PaymentStatus;
  receiver: string;
  internalFieldA: string;
  xYZRandomField: string;
};

export type PaymentItem = Pick<Payment, 'status'> & {
  count: number;
};

export type PaymentFilter = Pick<Payment, 'status'> | null;

export enum PaymentStatus {
  WRONG_PAYSLIP = 'wrong_payslip',
  WRONG_ADDRESS = 'wrong_address',
  DELIVERY_ERROR = 'delivery_error',
  SUCCESSFUL = 'successful',
  DECLINED = 'declined',
}
