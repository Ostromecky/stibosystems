import { PaymentStatus } from '@stibosystems/payments/data-access';

export type StatusItem = {
  value: PaymentStatus;
  viewValue: string;
};
