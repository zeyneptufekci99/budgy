import type { Transaction } from "@/types/transactions";

export function calculateIncome(transactions: Transaction[]) {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
}

export function calculateExpenses(transactions: Transaction[]) {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
}

export function calculateBalance(transactions: Transaction[]) {
  const income = calculateIncome(transactions);
  const expenses = calculateExpenses(transactions);

  return income - expenses;
}

export function getRecentTransactions(
  transactions: Transaction[],
  limit = 5
) {
  return transactions.slice(0, limit);
}