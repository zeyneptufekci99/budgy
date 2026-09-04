"use client";
import {
  CreateTransactionModal,
  Dropdown,
  Header,
  TransactionList,
} from "@/components";
import {
  dummyTransactions,
  transactionCategories,
  transactionTypes,
} from "@/dummy/transactions";
import { useMemo, useState } from "react";

export default function Transactions() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const allTransactionTypes = useMemo(() => {
    return transactionTypes.map((type) => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      value: type,
    }));
  }, [transactionTypes]);

  const allTransactionCategories = useMemo(() => {
    return transactionCategories.map((category) => ({
      label: category.charAt(0).toUpperCase() + category.slice(1),
      value: category,
    }));
  }, [transactionCategories]);

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

        <TransactionList transactions={dummyTransactions} />
      </div>
    </div>
  );
}
