"use client";

import { updateTransaction, createTransaction } from "@/api/transactions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { Transaction } from "@/types/transactions";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Label } from "./ui/label";
import { Dropdown } from "./dropdown";
import { Input } from "./ui/input";
import {
  transactionCategories,
  transactionTypes,
} from "@/constants/transactions";

export type CreateTransactionModalProps = {
  transaction?: Transaction;
  onSuccess?: () => void;
  onClose?: () => void;
};

export const CreateTransactionModal = ({
  transaction,
  onSuccess,
  onClose,
}: CreateTransactionModalProps) => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  const isEditMode = !!transaction;

  const transactionCategoryDropdownItems = transactionCategories.map(
    (transactionCategory) => ({
      label:
        transactionCategory.charAt(0).toUpperCase() +
        transactionCategory.slice(1),
      value: transactionCategory,
    }),
  );

  useEffect(() => {
    if (!transaction) {
      return;
    }

    setType(transaction.type);
    setAmount(String(transaction.amount));
    setCategory(transaction.category);
    setDescription(transaction.description);
    setDate(transaction.date.split("T")[0]);
    setOpen(true);
  }, [transaction]);

  const resetForm = () => {
    setType("");
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value && isEditMode) {
      resetForm();
      onClose?.();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = {
        amount: Number(amount),
        type,
        category,
        description,
        date,
      };

      if (isEditMode) {
        await updateTransaction(transaction.id, data);
        toast.success("Transaction updated successfully!");
      } else {
        await createTransaction(data);
        toast.success("Transaction created successfully!");
      }

      resetForm();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to save transaction:", error);

      toast.error(
        isEditMode
          ? "Failed to update transaction."
          : "Failed to create transaction.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!isEditMode && (
        <DialogTrigger
          render={
            <Button size="lg" variant="outline">
              Add Transaction
            </Button>
          }
        />
      )}

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Transaction" : "Create Transaction"}
            </DialogTitle>

            <DialogDescription>
              {isEditMode
                ? "Update the transaction details below."
                : "Fill in the details below to create a new transaction."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label>Type</Label>

            <ToggleGroup
              value={type ? [type] : []}
              onValueChange={(value) => setType(value[0] || "")}
            >
              {transactionTypes.map((transactionType) => (
                <ToggleGroupItem key={transactionType} value={transactionType}>
                  {transactionType.charAt(0).toUpperCase() +
                    transactionType.slice(1)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Amount</Label>

            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Category</Label>

            <Dropdown
              items={transactionCategoryDropdownItems}
              defaultValue={
                transactionCategoryDropdownItems.find(
                  (item) => item.value === category,
                ) || undefined
              }
              onChange={(value) => setCategory(value?.value || "")}
              placeholder="Select Category"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Description</Label>

            <Input
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Date</Label>

            <Input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />

            <Button type="submit">
              {isEditMode ? "Update Transaction" : "Create Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
