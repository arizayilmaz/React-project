export interface IExpense {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export interface ISubscription {
  id: string;
  name: string; // örn: "Netflix"
  amount: number; // örn: 229.99
  paymentDay: number; // Ayın günü (1-31 arası)
  lastPaidCycle?: string; // Son ödeme döngüsü (örn: "2023-10")
}