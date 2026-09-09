import type { Transaction } from "@/types/transactions";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

export type TransactionListProps = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  loading?: boolean;
  error?: boolean;
};

export const TransactionList = ({
  transactions,
  onDeleteTransaction,
  loading,
  error,
}: TransactionListProps) => {
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
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              Loading transactions...
            </TableCell>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              Failed to load transactions.
            </TableCell>
          </TableRow>
        ) : transactions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              No transactions found.
            </TableCell>
          </TableRow>
        ) : (
          transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>

              <TableCell>{transaction.description}</TableCell>

              <TableCell>
                {transaction.category.charAt(0).toUpperCase() +
                  transaction.category.slice(1)}
              </TableCell>

              <TableCell
                className={
                  transaction.type === "income" ? "text-income" : "text-expense"
                }
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
          ))
        )}
      </TableBody>
    </Table>
  );
};
