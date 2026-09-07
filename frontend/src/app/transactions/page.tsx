"use client";

import { deleteTransaction, getTransactions } from "@/api/transactions";
import {
  CreateTransactionModal,
  Dropdown,
  Header,
  TransactionList,
} from "@/components";
import { transactionCategories, transactionTypes } from "@/dummy/transactions";

import type { Transaction } from "@/types/transactions";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    }

    fetchTransactions();
  }, []);

  const allTransactionTypes = useMemo(() => {
    return transactionTypes.map((type) => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      value: type,
    }));
  }, []);

  const allTransactionCategories = useMemo(() => {
    return transactionCategories.map((category) => ({
      label: category.charAt(0).toUpperCase() + category.slice(1),
      value: category,
    }));
  }, []);

  const deleteTransactionFromTable = async (id: string) => {
    try {
      await deleteTransaction(id);
      toast.success("Transaction deleted successfully!");
    } catch (error) {
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

  return (
    <div className="flex flex-col flex-1">
      <Header title="Transactions" />

      <div className="flex flex-col gap-4 p-8 w-full">
        <CreateTransactionModal />

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
          onDeleteTransaction={deleteTransactionFromTable}
          transactions={filteredTransactions}
        />
      </div>
    </div>
  );
}
