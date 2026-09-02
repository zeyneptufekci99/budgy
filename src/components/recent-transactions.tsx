import { Transaction } from "@/types/transactions";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

export type RecentTransactionsProps = {
  transactions: Transaction[];
};

export const RecentTransactions = ({
  transactions,
}: RecentTransactionsProps) => {
  return (
    <Card className="flex flex-col gap-4 p-8 w-100">
      <div>
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className={cn(
              "flex justify-between flex-row gap-1",
              tx.type === "income" ? "text-income" : "text-expense",
            )}
          >
            <span>{tx.type === "income" ? "+" : "-"}</span>
            <span className="flex-1 mx-4 text-start">{tx.description}</span>
            <span>{tx.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
