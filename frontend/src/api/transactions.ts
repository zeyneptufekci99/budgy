const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type CreateTransactionData = {
  amount: number;
  type: string;
  category: string;
  description: string;
  date: string;
};

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getTransactions() {
  const response = await fetch(`${API_URL}/api/transaction`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

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
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  return response.json();
}

export async function updateTransaction(
  id: string,
  data: CreateTransactionData,
) {
  const response = await fetch(`${API_URL}/api/transaction/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update transaction");
  }

  return response.json();
}

export async function deleteTransaction(id: string) {
  const response = await fetch(`${API_URL}/api/transaction/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete transaction");
  }
}