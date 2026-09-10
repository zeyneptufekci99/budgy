"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type MonthlyChartProps = {
  data: {
    month: string;
    income: number;
    expenses: number;
  }[];
};

export const MonthlyChart = ({ data }: MonthlyChartProps) => {
  return (
    <div className="w-full h-80 rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Income vs Expenses</h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar fill="oklch(0.55 0.12 145)" dataKey="income" name="Income" />

          <Bar fill="oklch(0.62 0.14 35)" dataKey="expenses" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
