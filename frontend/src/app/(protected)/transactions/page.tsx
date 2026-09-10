"use client";

import { deleteTransaction, getTransactions } from "@/api/transactions";
import {
  CreateTransactionModal,
  Dropdown,
  Header,
  TransactionList,
} from "@/components";
import {
  transactionCategories,
  transactionTypes,
} from "@/constants/transactions";

import type { Transaction } from "@/types/transactions";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setError(true);
      toast.error("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const allTransactionTypes = transactionTypes.map((type) => ({
    label: type.charAt(0).toUpperCase() + type.slice(1),
    value: type,
  }));

  const allTransactionCategories = transactionCategories.map((category) => ({
    label: category.charAt(0).toUpperCase() + category.slice(1),
    value: category,
  }));

  const deleteTransactionFromTable = async (id: string) => {
    try {
      await deleteTransaction(id);

      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id),
      );

      toast.success("Transaction deleted successfully!");
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      toast.error("Failed to delete transaction.");
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesType = !selectedType || transaction.type === selectedType;

      const matchesCategory =
        !selectedCategory || transaction.category === selectedCategory;

      return matchesType && matchesCategory;
    });
  }, [transactions, selectedType, selectedCategory]);

  const handleEditTransaction = (id: string) => {
    const transaction = transactions.find(
      (transaction) => transaction.id === id,
    );

    if (!transaction) {
      return;
    }

    setEditingTransaction(transaction);
  };

  return (
    <div className="flex flex-col flex-1">
      <Header title="Transactions" />

      <div className="flex flex-col gap-4 p-8 w-full">
        <CreateTransactionModal
          transaction={editingTransaction ?? undefined}
          onClose={() => setEditingTransaction(null)}
          onSuccess={() => {
            setEditingTransaction(null);
            fetchTransactions();
          }}
        />
        <div className="flex flex-row gap-4">
          <Dropdown
            onChange={(value) => setSelectedType(value?.value || null)}
            items={allTransactionTypes}
            placeholder="Select Type"
          />

          <Dropdown
            onChange={(value) => setSelectedCategory(value?.value || null)}
            items={allTransactionCategories}
            placeholder="Select Category"
          />
        </div>

        <TransactionList
          onEditTransaction={handleEditTransaction}
          loading={loading}
          error={error}
          onDeleteTransaction={deleteTransactionFromTable}
          transactions={filteredTransactions}
        />
      </div>
    </div>
  );
}
