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

export function getMonthlyTransactionData(transactions: Transaction[]) {
  const monthlyData: Record<
    string,
    { month: string; income: number; expenses: number }
  > = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}`;

    if (!monthlyData[key]) {
      monthlyData[key] = {
        month: key,
        income: 0,
        expenses: 0,
      };
    }

    if (transaction.type === "income") {
      monthlyData[key].income += transaction.amount;
    } else {
      monthlyData[key].expenses += transaction.amount;
    }
  });

  return Object.values(monthlyData).sort((a, b) =>
    a.month.localeCompare(b.month),
  );
}

export function getExpenseCategoryData(transactions: Transaction[]) {
  const categoryData: Record<string, number> = {};

  transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      categoryData[transaction.category] =
        (categoryData[transaction.category] || 0) + transaction.amount;
    });

  return Object.entries(categoryData).map(([category, amount]) => ({
    category: category.at(0)?.toUpperCase() + category.slice(1),
    amount,
  }));
}