"use client";

import { getTransactions } from "@/api/transactions";
import { DashboardCard, Header, RecentTransactions } from "@/components";

import type { Transaction } from "@/types/transactions";
import {
  calculateBalance,
  calculateExpenses,
  calculateIncome,
  getRecentTransactions,
} from "@/utils/transaction";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

  const income = useMemo(() => calculateIncome(transactions), [transactions]);
  const expenses = useMemo(
    () => calculateExpenses(transactions),
    [transactions],
  );
  const balance = useMemo(() => calculateBalance(transactions), [transactions]);
  const recentTransactions = useMemo(
    () => getRecentTransactions(transactions),
    [transactions],
  );

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

          {loading ? (
            <p>Loading transactions...</p>
          ) : (
            <RecentTransactions transactions={recentTransactions} />
          )}
        </div>
      </div>
    </div>
  );
}
