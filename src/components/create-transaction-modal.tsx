import { JSXElementConstructor, ReactElement, ReactNode } from "react";
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

export type CreateTransactionModalProps = {};
export const CreateTransactionModal = ({}: CreateTransactionModalProps) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button size="lg" variant="outline">
              Add Transaction
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Transaction</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new transaction.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label>Type</Label>
            <ToggleGroup>
              {transactionTypes.map((type) => (
                <ToggleGroupItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Amount</Label>
            <Input placeholder="Amount" />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Dropdown
              items={transactionCategories.map((category) => ({
                label: category.charAt(0).toUpperCase() + category.slice(1),
                value: category,
              }))}
              onChange={(value) => console.log(value)}
              placeholder="Select Category"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Input placeholder="Description" />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <Input type="date" placeholder="Date" />
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
