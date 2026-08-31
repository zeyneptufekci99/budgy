import { Card, DashboardCard, RecentTransactions } from "@/components";
import { dummyTransactions } from "@/dummy/transactions";
import { dummyUser } from "@/dummy/user";

export default function Dashboard() {
  return (
    <div className="flex flex-col flex-1 font-sans ">
      <div className="text-2xl font-bold border-b">
        Welcome {dummyUser.name} {dummyUser.surname} !
      </div>
      <DashboardCard title="Balance" amount={dummyUser.balance} />

      <div className="flex flex-row gap-4 p-8 w-100">
        <DashboardCard title="Income" amount={3000} />
        <DashboardCard title="Expenses" amount={3000} />
      </div>

      <div>
        <div>Recent Transactions</div>
        <RecentTransactions transactions={dummyTransactions} />
      </div>
    </div>
  );
}
