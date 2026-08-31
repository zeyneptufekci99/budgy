export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "salary"
  | "food"
  | "transport"
  | "shopping"
  | "bills"
  | "entertainment"
  | "other";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  date: string;
}