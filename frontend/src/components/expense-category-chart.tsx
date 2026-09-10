"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type ExpenseCategoryChartProps = {
  data: {
    category: string;
    amount: number;
  }[];
};

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
];

export const ExpenseCategoryChart = ({ data }: ExpenseCategoryChartProps) => {
  return (
    <div className="w-full rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Expenses by Category</h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
