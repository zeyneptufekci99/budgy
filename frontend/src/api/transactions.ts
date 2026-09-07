const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type CreateTransactionData = {
  amount: number;
  type: string;
  category: string;
  description: string;
  date: string;
};

export async function getTransactions() {
  const response = await fetch(`${API_URL}/api/transaction`);

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return response.json();
}

export async function createTransaction(data: CreateTransactionData) {
  const response = await fetch(`${API_URL}/api/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  return response.json();
}

export async function deleteTransaction(id: string) {
  const response = await fetch(`${API_URL}/api/transaction/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete transaction");
  }
}