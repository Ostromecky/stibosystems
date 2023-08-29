export type Payment = {
  id: string;
  status: string;
  receiver: string;
  internalFieldA: string;
  xYZRandomField: string;
};

export type PaymentItem = Pick<Payment, 'status'> & {
  count: number;
};

export type PaymentFilter = Pick<Payment, 'status'>;
