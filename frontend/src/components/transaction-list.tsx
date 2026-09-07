import { Transaction } from "@/types/transactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useMemo } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export type TransactionListProps = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
};

export const TransactionList = ({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) => {
  const transactionTableData = useMemo(() => {
    return transactions.map((transaction) => ({
      id: transaction.id,
      date: transaction.date,
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
      amount: transaction.amount,
    }));
  }, [transactions]);

  return (
    <Table className="w-full">
      <TableHeader className="bg-chart-1">
        <TableRow>
          <TableHead className="text-left">Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactionTableData.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              {new Date(transaction.date).toLocaleDateString()}
            </TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>
              {transaction.category.charAt(0).toUpperCase() +
                transaction.category.slice(1)}
            </TableCell>
            <TableCell
              className={`${transaction.type === "income" ? "text-income" : "text-expense"}`}
            >
              {transaction.type.charAt(0).toUpperCase() +
                transaction.type.slice(1)}
            </TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell className="text-right">
              <Button
                onClick={() => onDeleteTransaction(transaction.id)}
                variant="ghost"
                size="icon"
              >
                <Trash2 size={18} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
