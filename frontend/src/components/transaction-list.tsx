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

export type TransactionListProps = {
  transactions: Transaction[];
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const transactionTableData = useMemo(() => {
    return transactions.map((transaction) => ({
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
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactionTableData.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{transaction.date}</TableCell>
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
            <TableCell className="text-right">{transaction.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
