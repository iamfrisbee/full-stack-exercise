export interface AddPayment {
  name: string;
  amount: number;
}

export interface Payment {
  id: number;
  name: string;
  amount: number;
  code: string;
  grid: string[][];
}
