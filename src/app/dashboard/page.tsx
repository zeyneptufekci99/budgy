import { DashboardCard, Header, RecentTransactions } from "@/components";
import { dummyTransactions } from "@/dummy/transactions";
import { dummyUser } from "@/dummy/user";

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
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <RecentTransactions transactions={dummyTransactions} />
        </div>
      </div>
    </div>
  );
}
