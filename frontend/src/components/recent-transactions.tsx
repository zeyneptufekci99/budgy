import type { Transaction } from "@/types/transactions";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

export type RecentTransactionsProps = {
  transactions: Transaction[];
  isEmpty?: boolean;
  isLoading?: boolean;
};

export const RecentTransactions = ({
  transactions,
  isEmpty,
  isLoading,
}: RecentTransactionsProps) => {
  return (
    <Card className="flex flex-col gap-2 p-8 w-full border-2">
      {isLoading ? (
        <p className="text-muted-foreground">Loading recent transactions...</p>
      ) : isEmpty ? (
        <div className="text-center text-lg">No recent transactions</div>
      ) : (
        transactions.map((tx) => (
          <div
            key={tx.id}
            className={cn(
              "flex justify-between flex-row gap-1 text-lg",
              tx.type === "income" ? "text-income" : "text-expense",
            )}
          >
            <span>{tx.type === "income" ? "+" : "-"}</span>

            <span className="flex-1 mx-4 text-start">{tx.description}</span>

            <span>{tx.amount.toFixed(2)}</span>
          </div>
        ))
      )}
    </Card>
  );
};
