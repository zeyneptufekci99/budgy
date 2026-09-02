import { DashboardCard, Header, RecentTransactions } from "@/components";
import { dummyTransactions } from "@/dummy/transactions";
import { dummyUser } from "@/dummy/user";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col flex-1">
      <Header title={`Welcome ${dummyUser.name} ${dummyUser.surname} !`} />
      <div className="flex flex-col gap-4 p-8 w-full">
        <DashboardCard
          className="border-2 border-balance text-balance!"
          title="Balance"
          amount={dummyUser.balance}
        />

        <div className="flex flex-row gap-4">
          <DashboardCard
            className="border-2 border-income text-income"
            title="Income"
            amount={3000}
          />
          <DashboardCard
            className="border-2 border-expense text-expense"
            title="Expenses"
            amount={3000}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row  items-center gap-4">
            <h3 className="text-lg font-semibold ">Recent Transactions</h3>

            <Link
              href="/transactions"
              className="text-blue-500 hover:underline"
            >
              View All
            </Link>
          </div>

          <RecentTransactions transactions={dummyTransactions} />
        </div>
      </div>
    </div>
  );
}
