"use client";

import { getTransactions } from "@/api/transactions";
import {
  DashboardCard,
  Header,
  RecentTransactions,
  MonthlyChart,
  ExpenseCategoryChart,
  Button,
} from "@/components";
import type { Transaction } from "@/types/transactions";
import {
  calculateBalance,
  calculateExpenses,
  calculateIncome,
  getRecentTransactions,
  getMonthlyTransactionData,
  getExpenseCategoryData,
} from "@/utils/transaction";
import Link from "next/link";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        toast.error("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const income = calculateIncome(transactions);
  const expenses = calculateExpenses(transactions);
  const balance = calculateBalance(transactions);
  const recentTransactions = getRecentTransactions(transactions);
  const monthlyTransactionData = getMonthlyTransactionData(transactions);
  const expenseCategoryData = getExpenseCategoryData(transactions);

  return (
    <div className="flex flex-col flex-1">
      <Header title="Welcome" />

      <div className="flex flex-col gap-4 p-8 w-full">
        <DashboardCard
          className="border-2 border-balance text-balance!"
          title="Balance"
          amount={balance}
        />

        <div className="flex flex-row gap-4">
          <DashboardCard
            className="border-2 border-income text-income"
            title="Income"
            amount={income}
          />

          <DashboardCard
            className="border-2 border-expense text-expense"
            title="Expenses"
            amount={expenses}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>

            <Link
              href="/transactions"
              className="text-blue-500 hover:underline"
            >
              View All
            </Link>
          </div>
          <MonthlyChart data={monthlyTransactionData} />
          <ExpenseCategoryChart data={expenseCategoryData} />

          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>

              <Link
                href="/transactions"
                className="text-blue-500 hover:underline"
              >
                View All
              </Link>
            </div>

            <RecentTransactions
              isLoading={loading}
              transactions={recentTransactions}
              isEmpty={recentTransactions.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
