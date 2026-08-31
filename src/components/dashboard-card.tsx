import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

export type DashboardCardProps = {
  title: string;
  amount: number;
  backgroundColor?: string;
};
export const DashboardCard = ({
  amount,
  title,
  backgroundColor,
}: DashboardCardProps) => {
  return (
    <Card
      className={cn(
        "flex flex-col gap-4 p-8 w-100",
        backgroundColor && `bg-${backgroundColor}`,
      )}
    >
      <div>{title}</div>
      <div>${amount.toFixed(2)}</div>
    </Card>
  );
};
