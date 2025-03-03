import { AddPayment, Payment } from 'shared/index.js';
import { calculateSecret, values } from './calculations.js';

const payments: Payment[] = [];

export function addPayment(payment: AddPayment) {
  payments.push({
    id: payments.length + 1,
    name: payment.name,
    amount: payment.amount,
    grid: values.grid,
    code: calculateSecret(),
  });
}

export function getPayments() {
  return payments;
}
