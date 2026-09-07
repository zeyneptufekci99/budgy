"use client";

import { useState } from "react";
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
import { transactionCategories, transactionTypes } from "@/dummy/transactions";
import { Dropdown } from "./dropdown";
import { Input } from "./ui/input";
import { createTransaction } from "@/api/transactions";
import { toast } from "sonner";

export type CreateTransactionModalProps = {};

export const CreateTransactionModal = ({}: CreateTransactionModalProps) => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ type, amount, category, description, date });
    try {
      await createTransaction({
        amount: Number(amount),
        type,
        category,
        description,
        date,
      });

      toast.success("Transaction created successfully!");

      setType("");
      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");
    } catch (error) {
      toast.error("Failed to create transaction.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="lg" variant="outline">
            Add Transaction
          </Button>
        }
      />

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Transaction</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new transaction.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label>Type</Label>
            <ToggleGroup onValueChange={(value) => setType(value[0])}>
              {transactionTypes.map((type) => (
                <ToggleGroupItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
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
              items={transactionCategories.map((transactionCategory) => ({
                label:
                  transactionCategory.charAt(0).toUpperCase() +
                  transactionCategory.slice(1),
                value: transactionCategory,
              }))}
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

            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
